import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha inválidos!', 401);
    }

    const password_matched = await compare(password, user.password);

    if (!password_matched) {
      throw new AppError('E-mail ou senha inválidos!', 401);
    }

    const token = sign({}, String(auth.secret), {
      subject: user.id,
      expiresIn: auth.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
