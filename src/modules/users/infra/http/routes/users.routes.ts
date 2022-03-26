import { Router } from 'express';
import multer from 'multer';

import { container } from 'tsyringe';
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticaded';
import CreateUserService from '../../../services/CreateUserService';
import UpdateuserAvatarService from '../../../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateuserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

export default usersRoutes;
