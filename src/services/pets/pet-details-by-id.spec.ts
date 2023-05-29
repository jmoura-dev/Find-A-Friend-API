import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetDetailsService } from './pet-details-by-id'

let petsRepository: InMemoryPetsRepository
let sut: PetDetailsService

describe('Get pet details Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new PetDetailsService(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    const petRegister = await petsRepository.create({
      name: 'Ralf',
      age: '3',
      breed: 'mutt',
      city: 'maceió',
      size: 'medium',
      org_id: 'Your happy pet',
    })

    const { pet } = await sut.execute({ id: petRegister.id })

    expect(pet.id).toEqual(expect.any(String))
  })
})
