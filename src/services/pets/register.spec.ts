import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetService } from './register'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetService

describe('Register pet service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetService(petsRepository)
  })

  it('Should be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Ralf',
      age: '3',
      breed: 'mutt',
      city: 'maceió',
      org_id: 'Pet happy',
      size: 'medium',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
