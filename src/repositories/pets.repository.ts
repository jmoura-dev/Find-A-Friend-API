import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  SearchManyByCharacteristics(
    city: string,
    age?: string,
    breed?: string,
    size?: string,
  ): Promise<Pet[]>
}
