import { OrgsRepository } from '@/repositories/orgs.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import { OrgDoesNotExists } from '../errors/org-does-not-exists'

interface RegisterPetRequest {
  name: string
  age: string
  breed: string
  size: string
  city: string
  orgId: string
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    breed,
    size,
    city,
    orgId,
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgDoesNotExists()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      breed,
      size,
      city,
      org_id: org.id,
    })

    return {
      pet,
    }
  }
}
