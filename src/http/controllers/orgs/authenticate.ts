import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateOrgService } from '@/services/factories/make-authenticate-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = createBodySchema.parse(request.body)

  try {
    const service = makeAuthenticateOrgService()

    const { org } = await service.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: 'ADMIN',
      },
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: 'ADMIN',
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
