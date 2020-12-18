import { Request, Response } from 'express';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatar);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatar_filename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;
