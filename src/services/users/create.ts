import { hash } from 'bcryptjs'

interface Data {
  name: string
  email: string
  password: string
}

export class CreateService {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: Data) {
    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
