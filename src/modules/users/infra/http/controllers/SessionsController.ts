import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userNotPassword = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return response.json({ userNotPassword, token });
  }
}

export default SessionsController;
