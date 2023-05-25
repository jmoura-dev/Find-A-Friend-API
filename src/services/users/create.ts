import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { EmailAlreadyRegistered } from '../errors/email-already-registered'

interface CreateServiceRequest {
  name: string
  email: string
  password: string
}

interface CreateServiceResponse {
  user: User
}

export class CreateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyRegistered()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
