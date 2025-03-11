import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllResponse, User, UsersService } from './users.service';

// /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users?page=1&limit=10
  @Get()
  // findAll(@Query('page') page: string, @Query('limit') limit: string): User[] {
  findAll(@Query() query: FindAllUsersDto): FindAllResponse {
    return this.usersService.findAll(query);
  }

  // GET /users/1
  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateUserDto): User {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    this.usersService.delete(+id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
