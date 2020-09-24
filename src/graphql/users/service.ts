import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import CreateUserInput from './dto/createUser.input';
import UsersArgs from './dto/users.args';

import User from './models/user';

@Injectable()
export default class UsersService {
  private readonly users: User[] = [{
    id: 'aff4001f-fdf4-4e46-a45a-46e230503a77',
    name: 'Anthony',
    interestIds: [
      '4246ec53-6eaf-4744-93ce-e2643263d84b',
      '65874b8b-844f-4664-ac5d-5b7d9edd16e6',
    ],
  }];

  async create(data: CreateUserInput): Promise<User> {
    const user: User = {
      id: uuidv4(),
      interestIds: [],
      ...data,
    };
    this.users.push(user);
    return user;
  }

  async findOneById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { skip, take } = usersArgs;
    return this.users.slice(skip, skip + take);
  }

  async remove(id: string): Promise<boolean> {
    this.users.splice(this.users.findIndex((u) => u.id === id), 1);
    return true;
  }
}
