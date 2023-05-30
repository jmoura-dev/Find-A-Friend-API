import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Fetch List Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch by characteristics', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Lessie',
        age: '7',
        size: 'big',
        breed: 'mutt',
        city: 'juazeiro',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ralf',
        age: '5',
        size: 'big',
        breed: 'mutt',
        city: 'juazeiro',
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'juazeiro',
        age: '5',
        size: 'big',
        breed: '',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Ralf' }),
    ])
  })
})
