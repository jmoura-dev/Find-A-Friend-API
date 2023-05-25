import { describe, it, expect, beforeEach } from 'vitest'
import { CreateService } from './create'
import { compare } from 'bcryptjs'
import { EmailAlreadyRegistered } from '../errors/email-already-registered'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: CreateService

describe('Create Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateService(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should crypt user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    })

    const checkHashed = await compare('123456', user.password_hash)

    expect(checkHashed).toEqual(true)
  })

  it('Should crypt user password upon registration', async () => {
    await sut.execute({
      name: 'fulano',
      email: 'fulano@email.com',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'fulano',
        email: 'fulano@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyRegistered)
  })
})
