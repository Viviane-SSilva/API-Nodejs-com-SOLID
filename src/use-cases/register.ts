import { prisma } from '../lib/prisma.js'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userwithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userwithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
