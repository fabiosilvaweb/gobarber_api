import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha inválidos!', 401);
    }

    const password_matched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

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
