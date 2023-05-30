import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface FetchListPetOnCityRequest {
  city: string
  age?: string
  breed?: string
  size?: string
}

interface FetchListPetOnCityResponse {
  pets: Pet[]
}

export class FetchListPetOnCity {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    breed,
    size,
  }: FetchListPetOnCityRequest): Promise<FetchListPetOnCityResponse> {
    if (city === '') {
      throw new Error('It is necessary to inform the city')
    }
    const pets = await this.petsRepository.SearchManyByCharacteristics(
      city,
      age,
      breed,
      size,
    )

    return {
      pets,
    }
  }
}
