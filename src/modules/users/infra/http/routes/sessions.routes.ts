import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
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
});

export default sessionsRouter;
