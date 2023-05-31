import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Reload Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Happy pet',
      email: 'happypet@email.com',
      address: 'rua dos bobos, número 0',
      password: '123456',
      whatsapp_number: '82 938383893',
    })

    const authReponse = await request(app.server).post('/orgs/sessions').send({
      email: 'happypet@email.com',
      password: '123456',
    })

    const cookies = authReponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/orgs/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
