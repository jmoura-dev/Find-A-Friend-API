import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCharacteristics(
    city: string,
    age?: string,
    breed?: string,
    size?: string,
  ): Promise<Pet[]>
}
