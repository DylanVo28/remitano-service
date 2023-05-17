import { Body, Controller, Post, UseGuards, Headers, Get } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { AuthGuard } from "../guard/jwtAuthentication.guard";

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createVideo( @Body('url') url: string,@Headers('Authorization') authHeader: string){
    return this.videosService.createVideo(url,authHeader)
  }

  @Get()
  async getVideos(){
    return this.videosService.getVideos()
  }
}
