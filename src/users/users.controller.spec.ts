import { UsersController } from "./users.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";
import { HttpStatus } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users.module";
const uri = "mongodb+srv://admin:admin@o-seven.xybtgtv.mongodb.net/?retryWrites=true&w=majority";
describe('UsersController',()=>{
  let controller: UsersController;

  let requestMock={
    body:{}
  } as unknown as Request

  const statusResponseMock={
    send: jest.fn(x=>x)
  }

  let responseMock={
    status: jest.fn(x=>statusResponseMock),
    send: jest.fn(x=>x)
  } as unknown as Response

  beforeEach(async ()=>{
    const module:TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), UsersModule],
    }).compile()
    controller=module.get<UsersController>(UsersController)


  })
  it('should be defined',()=>{
    expect(controller).toBeDefined()
  })

  it('createUser',()=>{


    it('should return a status of 500',()=>{
      controller.createUser(requestMock,responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: `E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "${requestMock.body.username}" }`
      })
    })

    it('should return a status of 201',()=>{
      requestMock.body={
        username: 'kedinhvo2003@gmail.com',
        password: 'Dinhvo2807'
      }
      controller.createUser(requestMock,responseMock)
      expect(responseMock.send).toHaveBeenCalledWith(HttpStatus.CREATED)
    })
  })
})