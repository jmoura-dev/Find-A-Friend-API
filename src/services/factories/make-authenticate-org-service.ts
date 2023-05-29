import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgService } from '../orgs/authenticate'

export function makeAuthenticateOrgService() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgService = new AuthenticateOrgService(orgsRepository)

  return authenticateOrgService
}
