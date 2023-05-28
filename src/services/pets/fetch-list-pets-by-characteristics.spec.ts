import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchListPetOnCity } from './fetch-list-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FetchListPetOnCity

describe('Fetch List pets by city', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchListPetOnCity(petsRepository)
  })

  it('Should be able to fetch list of pets on city', async () => {
    await petsRepository.create({
      name: 'Ralf',
      age: '3',
      breed: 'mutt',
      city: 'maceió',
      size: 'medium',
      org_id: 'Pet happy',
    })

    await petsRepository.create({
      name: 'Lessie',
      age: '3',
      breed: 'mutt',
      city: 'maceió',
      size: 'medium',
      org_id: 'Your best friend',
    })

    const { pets } = await sut.execute({
      city: 'maceió',
      age: '3',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Ralf', breed: 'mutt' }),
      expect.objectContaining({ name: 'Lessie', size: 'medium' }),
    ])
  })
})
