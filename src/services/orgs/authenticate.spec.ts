import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateService(orgsRepository)
  })

  it('Must be able to authenticate', async () => {
    const password_hash = await hash('123456', 6)

    await orgsRepository.create({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
      password_hash,
    })

    const { org } = await sut.execute({
      email: 'random_org@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Must not be able to authenticate with invalid email', async () => {
    const password_hash = await hash('123456', 6)

    await orgsRepository.create({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
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

    await orgsRepository.create({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
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
