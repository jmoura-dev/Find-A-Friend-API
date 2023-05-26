import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      breed: data.breed,
      size: data.size,
      city: data.city,
      org_id: data.org_id,
      about: data.about ?? null,
      avatar_pet: data.avatar_pet ?? null,
    }

    this.items.push(pet)

    return pet
  }
}
