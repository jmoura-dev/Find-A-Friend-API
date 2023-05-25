import { OrgsRepository } from '@/repositories/orgs.repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyRegistered } from '../errors/email-already-registered'
import { Org } from '@prisma/client'

interface RegisterOrgRequest {
  name: string
  email: string
  password: string
  address: string
  whatsapp_number: string
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    whatsapp_number,
  }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const password_hash = await hash(password, 6)

    const doesEmailSameExists = await this.orgsRepository.findByEmail(email)

    if (doesEmailSameExists) {
      throw new EmailAlreadyRegistered()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      whatsapp_number,
    })

    return {
      org,
    }
  }
}
