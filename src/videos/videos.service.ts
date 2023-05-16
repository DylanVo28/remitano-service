import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Video, VideoDocument } from "./videos.model";
import { decodedToken } from "./videos.util";

@Injectable()
export class VideosService {
  constructor(@InjectModel('video') private readonly videoModel: Model<VideoDocument>) { }

  async createVideo(url: string,token: string):Promise<Video>{
    try {
      const user=decodedToken(token)
      const video= this.videoModel.create({
        url: url,
        username: user.username
      })
      return video
    }catch (e) {

    }
  }

  async getVideos(){
    return this.videoModel.find()
  }
}
