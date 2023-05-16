import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { MongooseModule } from "@nestjs/mongoose";
import { VideoSchema } from "./videos.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: "video", schema: VideoSchema }])],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
