import { hash } from 'bcryptjs'
import { UsersRepositoru } from '../repositories/users-repository.js'
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoru) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userwithSameEmail = await this.usersRepository.findByEmail(email)
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
