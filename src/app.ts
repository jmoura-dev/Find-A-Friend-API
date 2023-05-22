import fastify from 'fastify'
import { useRoutes } from './http/controllers/users/usersRoutes'

export const app = fastify()

app.register(useRoutes)
