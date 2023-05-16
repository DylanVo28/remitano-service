import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import * as bcrypt from 'bcrypt'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this.usersService.createUser(
        username,
        hashedPassword,
      );
      return result;
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
