import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetDetails } from './getPetDetails'
import { fetchListPets } from './fetchListPets'
import { verifyRole } from '@/http/middlewares/only-admin'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', { onRequest: [verifyRole('ADMIN')] }, create)
  app.get('/pets/:id', getPetDetails)

  app.get('/pets', fetchListPets)
}
