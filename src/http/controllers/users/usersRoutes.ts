import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', create)

  app.post('/users/sessions', authenticate)

  app.patch('/users/token/refresh', refresh)
}
