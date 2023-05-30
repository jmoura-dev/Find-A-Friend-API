import { makeFetchListPetOnCity } from '@/services/factories/make-fetch-list-pets-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchListPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const characteristicsQuerySchema = z.object({
    city: z.string(),
    age: z.string(),
    breed: z.string(),
    size: z.string(),
  })

  const { city, age, breed, size } = characteristicsQuerySchema.parse(
    request.query,
  )

  try {
    const service = makeFetchListPetOnCity()

    const pets = await service.execute({
      city,
      age,
      breed,
      size,
    })

    return reply.status(200).send(pets)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
