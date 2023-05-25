import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('Must be able to authenticate', async () => {
    const password_hash = await hash('123456', 6)

    await usersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password_hash,
    })

    const { user } = await sut.execute({
      email: 'fulano@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Must not be able to authenticate with invalid email', async () => {
    const password_hash = await hash('123456', 6)

    await usersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password_hash,
    })

    expect(async () => {
      await sut.execute({
        email: 'error@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Must not be able to authenticate with invalid password', async () => {
    const password_hash = await hash('123456', 6)
    const email = 'fulano@email.com'

    await usersRepository.create({
      name: 'fulano',
      email,
      password_hash,
    })

    expect(async () => {
      await sut.execute({
        email,
        password: '1234256',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
