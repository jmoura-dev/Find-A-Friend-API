import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('ok', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Happy pet',
      email: 'happypet@email.com',
      address: 'rua dos bobos, número 0',
      password: '123456',
      whatsapp_number: '82 938383893',
    })

    expect(response.statusCode).toEqual(201)
  })
})
