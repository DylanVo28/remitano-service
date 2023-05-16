import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { NotificationsModule } from './notifications/notifications.module';
const uri = "mongodb+srv://admin:admin@o-seven.xybtgtv.mongodb.net/?retryWrites=true&w=majority";
@Module({
  imports: [MongooseModule.forRoot(uri), UsersModule, AuthModule, VideosModule, NotificationsModule,   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
