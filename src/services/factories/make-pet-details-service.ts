import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetDetailsService } from '../pets/pet-details-by-id'

export function makePetDetailsById() {
  const petsRepository = new PrismaPetsRepository()
  const petDetailsService = new PetDetailsService(petsRepository)

  return petDetailsService
}
