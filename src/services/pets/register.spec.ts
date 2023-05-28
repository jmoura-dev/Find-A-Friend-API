import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetService } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { OrgDoesNotExists } from '../errors/org-does-not-exists'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetService

describe('Register pet service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetService(petsRepository, orgsRepository)
  })

  it('Should be able to register', async () => {
    const org = await orgsRepository.create({
      name: 'Random Org',
      email: 'random_org@email.com',
      address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
      whatsapp_number: '82 93737-3233',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Ralf',
      age: '3',
      breed: 'mutt',
      city: 'maceió',
      size: 'medium',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should not be able to register a pet without informing org correctly', async () => {
    expect(async () => {
      await sut.execute({
        name: 'Ralf',
        age: '3',
        breed: 'mutt',
        city: 'maceió',
        size: 'medium',
        orgId: 'Org-does-not-exists',
      })
    }).rejects.toBeInstanceOf(OrgDoesNotExists)
  })
})
