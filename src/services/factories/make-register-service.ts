import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateService } from '../users/create'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const createService = new CreateService(usersRepository)

  return createService
}
