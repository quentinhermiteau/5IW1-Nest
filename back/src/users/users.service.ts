import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export interface FindAllResponse {
  data: User[];
  page: number;
  limit: number;
}
interface FindAllQueryParams {
  page: number;
  limit: number;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(queryParams: FindAllQueryParams): Promise<FindAllResponse> {
    return {
      data: await this.prisma.user.findMany(),
      page: queryParams.page,
      limit: queryParams.limit,
    };
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // findOne(id: number): User {
  //   return this.users.filter((user: User) => user.id === id)[0];
  // }

  // create({ name }: CreateBody): User {
  //   const user = {
  //     id: new Date().getTime(),
  //     name,
  //   };

  //   this.users.push(user);

  //   return user;
  // }

  // update(id: number, { name }: CreateBody): User {
  //   const newUser = this.users.filter((user: User) => user.id === id)[0];
  //   newUser.name = name;

  //   const users = this.users.map((user: User) => {
  //     if (user.id === id) {
  //       return newUser;
  //     }
  //     return user;
  //   });

  //   this.users = [...users];

  //   return newUser;
  // }

  // delete(id: number) {
  //   this.users = this.users.filter((user: User) => user.id !== id);
  // }
}
