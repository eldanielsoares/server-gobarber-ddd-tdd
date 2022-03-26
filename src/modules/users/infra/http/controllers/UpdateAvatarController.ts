import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateuserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UpdateAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateuserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
