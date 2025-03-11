import { Injectable } from '@nestjs/common';

export interface FindAllResponse {
  data: User[];
  page: number;
  limit: number;
}

export interface User {
  id: number;
  name: string;
}

export interface FindAllQueryParams {
  page: string;
  limit: string;
}

export interface CreateBody {
  name: string;
}

@Injectable()
export class UsersService {
  users = [{ id: 1, name: 'Quentin' }];

  findAll(queryParams: FindAllQueryParams): FindAllResponse {
    return {
      data: this.users,
      page: +queryParams.page,
      limit: +queryParams.limit,
    };
  }

  findOne(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }

  create({ name }: CreateBody): User {
    const user = {
      id: new Date().getTime(),
      name,
    };

    this.users.push(user);

    return user;
  }

  update(id: number, { name }: CreateBody): User {
    const newUser = this.users.filter((user: User) => user.id === id)[0];
    newUser.name = name;

    const users = this.users.map((user: User) => {
      if (user.id === id) {
        return newUser;
      }
      return user;
    });

    this.users = [...users];

    return newUser;
  }

  delete(id: number) {
    this.users = this.users.filter((user: User) => user.id !== id);
  }
}
