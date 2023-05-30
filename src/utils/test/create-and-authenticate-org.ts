import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    id: randomUUID(),
    name: 'Happy pet',
    email: 'happypet@email.com',
    address: 'rua dos bobos, número 0',
    password: '123456',
    whatsapp_number: '82 938383893',
  })

  const response = await request(app.server).post('/orgs/sessions').send({
    email: 'happypet@email.com',
    password: '123456',
  })

  const { token } = response.body

  return { token }
}
