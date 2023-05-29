import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgService } from '../orgs/register'

export function makeRegisterOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrgService = new RegisterOrgService(orgsRepository)

  return registerOrgService
}
