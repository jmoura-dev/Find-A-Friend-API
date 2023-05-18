import { FastifyInstance } from 'fastify'
import { create } from './controllers/users/create'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', create)
}
