/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '../../../config/upload';
import User from '../infra/typeorm/entities/Users';
import AppError from '../../../shared/errors/AppError';
import IUsesrRepository from '../repositories/IUsersRepository';
import IStorageProvider from '../../../shared/container/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateuserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsesrRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateuserAvatarService;
