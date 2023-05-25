import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { EmailAlreadyRegistered } from '@/services/errors/email-already-registered'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchemaRegisterUser = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createSchemaRegisterUser.parse(request.body)

  try {
    const registerService = makeRegisterService()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyRegistered) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
