import { EmailAlreadyRegistered } from '@/services/errors/email-already-registered'
import { makeRegisterOrgService } from '@/services/factories/make-register-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    whatsapp_number: z.string(),
  })

  const { name, email, password, address, whatsapp_number } =
    createBodySchema.parse(request.body)

  try {
    const service = makeRegisterOrgService()

    await service.execute({
      name,
      email,
      password,
      address,
      whatsapp_number,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyRegistered) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
