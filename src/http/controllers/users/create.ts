import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateService } from '@/services/users/create'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchemaRegisterUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createSchemaRegisterUser.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const createService = new CreateService(usersRepository)

    await createService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
