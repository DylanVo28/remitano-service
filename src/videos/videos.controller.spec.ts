import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";
import { HttpStatus } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VideosController } from "./videos.controller";
import { VideosModule } from "./videos.module";
const uri = "mongodb+srv://admin:admin@o-seven.xybtgtv.mongodb.net/?retryWrites=true&w=majority";
describe('VideosController',()=>{
  let controller: VideosController;

  let requestMock={
    url: 'link url youtube'
  }

  let headerMock={
    authHeader: 'Bearer Token.abc.xyz'
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
      imports: [MongooseModule.forRoot(uri), VideosModule],
    }).compile()
    controller=module.get<VideosController>(VideosController)


  })
  it('should be defined',()=>{
    expect(controller).toBeDefined()
  })

  it('createVideo',()=>{
    it('should return a status of 403',()=>{
      controller.createVideo(requestMock.url,headerMock.authHeader)
      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN)
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      })
    })

    it('should return a status of 201',()=>{
      controller.createVideo(requestMock.url,headerMock.authHeader)
      expect(responseMock.send).toHaveBeenCalledWith(HttpStatus.CREATED)
    })
  })

  it('getVideos',()=>{
    it('should return a status of 200',()=>{
      controller.getVideos()
      expect(responseMock.send).toHaveBeenCalledWith(HttpStatus.OK)
    })
  })
})