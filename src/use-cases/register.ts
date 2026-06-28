import { prisma } from '../lib/prisma.js'
import { hash } from 'bcryptjs'
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userwithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userwithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
