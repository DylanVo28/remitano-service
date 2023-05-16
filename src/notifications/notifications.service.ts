import { Injectable } from '@nestjs/common';
import { VideosService } from "../videos/videos.service";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly videosService: VideosService
  ) {}
  async getVideos(){
    return this.videosService.getVideos()
  }
}
