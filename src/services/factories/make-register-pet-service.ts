import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterPetService } from '../pets/register'

export function makeRegisterPetService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const registerPetService = new RegisterPetService(
    petsRepository,
    orgsRepository,
  )

  return registerPetService
}
