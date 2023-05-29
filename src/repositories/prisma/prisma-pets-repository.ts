import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async SearchManyByCharacteristics(
    city: string,
    age?: string | undefined,
    breed?: string | undefined,
    size?: string | undefined,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        age: {
          contains: age,
        },
        breed: {
          contains: breed,
        },
        size: {
          contains: size,
        },
      },
    })

    return pets
  }
}
