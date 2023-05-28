import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface PetsDetailsRequest {
  id: string
}

interface PetsDetailsResponse {
  pet: Pet
}

export class PetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: PetsDetailsRequest): Promise<PetsDetailsResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('This pet do not exists')
    }

    return {
      pet,
    }
  }
}
