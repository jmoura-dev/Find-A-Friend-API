import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCharacteristics(
    city: string,
    age?: string,
    breed?: string,
    size?: string,
  ): Promise<Pet[]>
}
