import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrgService } from './register'
import { compare } from 'bcryptjs'
import { EmailAlreadyRegistered } from '../errors/email-already-registered'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgService

describe('Register Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgService(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
      password: '123456',
    })

    expect(org.name).toEqual('Random Org')
  })

  it('Must be possible to encrypt the password', async () => {
    const { org } = await sut.execute({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
      password: '123456',
    })

    const verifyHashedPassword = await compare('123456', org.password_hash)

    expect(true).toEqual(verifyHashedPassword)
  })

  it('should not be possible to register org with same email', async () => {
    await sut.execute({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Random Org',
        email: 'random_org@email.com',
        address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
        whatsapp_number: '82 93737-3233',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyRegistered)
  })
})
