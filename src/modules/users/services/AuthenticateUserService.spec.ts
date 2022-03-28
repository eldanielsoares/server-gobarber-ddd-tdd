import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakHashProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createuser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createuser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '1234',
    });

    const response = await authenticateUser.execute({
      email: 'john@email.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with no existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createuser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createuser.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '1234',
    });

    expect(
      authenticateUser.execute({
        email: 'john@email.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
