import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get details of a single pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.create({
      data: {
        name: 'Random Org',
        email: 'random_org@email.com',
        address: 'R. São Malaquias, 13a - Jacintinho, Maceió - AL, 57040-420',
        whatsapp_number: '82 93737-3233',
        password_hash: await hash('123456', 6),
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Lessie',
        age: '7',
        size: 'big',
        breed: 'mutt',
        city: 'juazeiro',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.name).toEqual('Lessie')
  })
})
