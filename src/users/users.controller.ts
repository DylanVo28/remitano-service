import { Body, Controller, HttpException, HttpStatus, Post, Req, Request, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import * as bcrypt from 'bcrypt'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async createUser(
    @Req() request, @Res() response
  ) {
    try {
      let {username,password}: any=request.body
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const result = await this.usersService.createUser(
        username,
        hashedPassword,
      );
      response.status(HttpStatus.CREATED).send(result)
    }catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e.message)
    }

  }
}
