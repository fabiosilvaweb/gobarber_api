import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../../../errors/AppError';
import User from '../entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const usersEmailExists = await usersRepository.findByEmail(email);

    if (usersEmailExists) {
      throw new AppError('E-mail já cadastrado!', 401);
    }

    const password_hash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: password_hash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
