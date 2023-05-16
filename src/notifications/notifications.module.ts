import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { VideosModule } from "../videos/videos.module";
import { VideosService } from "../videos/videos.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../users/users.model";
import { VideoSchema } from "../videos/videos.model";

@Module({
  imports:[VideosModule,MongooseModule.forFeature([{ name: "video", schema: VideoSchema }])],
  providers: [NotificationsGateway, NotificationsService,VideosService],
})
export class NotificationsModule {}
