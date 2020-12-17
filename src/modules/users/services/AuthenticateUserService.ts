import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import AppError from '../../../errors/AppError';
import User from '../entities/User';

interface Response {
  user: User;
  token: string;
}

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('E-mail ou senha inválidos!', 401);
    }

    const password_matched = await compare(password, user.password);

    if (!password_matched) {
      throw new AppError('E-mail ou senha inválidos!', 401);
    }

    const token = sign({}, '123', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
