import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateService } from '@/services/users/create'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchemaRegisterUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createSchemaRegisterUser.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()
  const usersRepository = new CreateService(prismaUsersRepository)

  await usersRepository.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send()
}
