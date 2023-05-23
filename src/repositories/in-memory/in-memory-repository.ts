import { User, Prisma, Role } from '@prisma/client'
import { UsersRepository } from '../users.repository'

export class InMemoryRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-01',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: Role.MEMBER,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
