import { OrgDoesNotExists } from '@/services/errors/org-does-not-exists'
import { makeRegisterPetService } from '@/services/factories/make-register-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const createBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    breed: z.string(),
    city: z.string(),
  })

  const { name, age, size, breed, city } = createBodySchema.parse(request.body)

  try {
    const petsRepository = makeRegisterPetService()

    await petsRepository.execute({
      name,
      age,
      size,
      breed,
      city,
      orgId: request.user.sub, // id da org logada
    })
  } catch (err) {
    if (err instanceof OrgDoesNotExists) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
