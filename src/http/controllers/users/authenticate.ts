import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { AuthenticateService } from '@/services/users/authenticate'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSchemaAuthenticate = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = createSchemaAuthenticate.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticate = new AuthenticateService(usersRepository)

    await authenticate.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
