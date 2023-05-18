import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";
import { HttpStatus } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthModule } from "./auth.module";
describe('AuthController',()=>{
  let controller: AuthController;

  let requestMock={
    username: 'username input',
    password: 'password input'
  }

  const statusResponseMock={
    send: jest.fn(x=>x)
  }

  let responseMock={
    status: jest.fn(x=>statusResponseMock),
    send: jest.fn(x=>x)
  } as unknown as Response

  beforeEach(async ()=>{
    const module:TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile()
    controller=module.get<AuthController>(AuthController)


  })
  it('should be defined',()=>{
    expect(controller).toBeDefined()
  })

  it('createVideo',()=>{
    it('should return a status of 401',()=>{
      controller.login(requestMock)
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED)
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        "statusCode": 401,
        "message": "Unauthorized"
      })
    })

    it('should return a status of 201',()=>{
      controller.login(requestMock)
      expect(responseMock.send).toHaveBeenCalledWith(HttpStatus.CREATED)
    })
  })
})