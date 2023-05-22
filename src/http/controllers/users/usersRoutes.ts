import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function useRoutes(app: FastifyInstance) {
  app.post('/users', create)
}
