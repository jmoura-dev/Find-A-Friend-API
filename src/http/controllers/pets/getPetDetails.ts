import { makePetDetailsById } from '@/services/factories/make-pet-details-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = createParamsSchema.parse(request.params)

  try {
    const service = makePetDetailsById()

    const pet = await service.execute({
      id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
