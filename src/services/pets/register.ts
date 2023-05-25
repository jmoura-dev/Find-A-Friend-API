import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'

interface RegisterPetRequest {
  name: string
  age: string
  breed: string
  size: string
  city: string
  org_id: string
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    breed,
    size,
    city,
    org_id,
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      size,
      city,
      org_id,
    })

    return {
      pet,
    }
  }
}
