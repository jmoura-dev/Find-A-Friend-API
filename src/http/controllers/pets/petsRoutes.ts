import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getPetDetails } from './getPetDetails'
import { fetchListPets } from './fetchListPets'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pets', create)
  app.get('/pets/:id', getPetDetails)

  app.get('/pets', fetchListPets)
}
