import * as jwt from "jsonwebtoken";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from 'express';

export function decodedToken(token: string):any{
  try{
    const authToken=token.split(" ")[1]

    const decoded= jwt.decode(authToken)
    return decoded
  }catch (e) {
    return null
  }
}