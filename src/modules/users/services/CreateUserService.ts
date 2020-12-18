import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersEmailExists = await this.usersRepository.findByEmail(email);

    if (usersEmailExists) {
      throw new AppError('E-mail já cadastrado!', 401);
    }

    const password_hash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}

export default CreateUserService;
