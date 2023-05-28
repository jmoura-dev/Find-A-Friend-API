import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs.repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsReposity implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    if (!org) {
      return null
    }

    return org
  }
}