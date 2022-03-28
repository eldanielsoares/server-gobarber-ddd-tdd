import { v4 } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/Users';
import IUsesrRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsesrRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User> {
    const user = this.users.find((findUser) => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = this.users.find((findUser) => findUser.id === id);
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
