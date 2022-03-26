import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/EnsureAuthenticaded';
import UsersController from '../controllers/UsersController';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

const usersRoutes = Router();
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarController.update
);

export default usersRoutes;
