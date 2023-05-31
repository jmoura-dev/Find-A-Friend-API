import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)

  app.post('/orgs/sessions', authenticate)

  app.patch('/orgs/token/refresh', refresh)
}
