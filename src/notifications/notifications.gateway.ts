import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NotificationsService } from './notifications.service';
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class NotificationsGateway {

  constructor(private readonly notificationsService: NotificationsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('create_video')
  listenCreateVideo(@MessageBody() content: string,@ConnectedSocket() socket: Socket) {
    this.server.sockets.emit('receive_create_video',content)

    return content
  }

  @SubscribeMessage('request_all_videos')
  async requestAllVideos(@ConnectedSocket() socket: Socket){
    let videos=await this.notificationsService.getVideos()
    socket.emit('send_all_videos',videos)
  }

}
