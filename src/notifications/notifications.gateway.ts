import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { NotificationsService } from './notifications.service';
import { Namespace, Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
  namespace: 'notifications'
})
export class NotificationsGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{
  private readonly logger= new Logger(NotificationsGateway.name)
  constructor(private readonly notificationsService: NotificationsService) {}
  @WebSocketServer()
  io: Namespace;

  afterInit(server: any): any {
    this.logger.log(`Websocket Gateway initialized`)
  }

  async handleConnection(client: any, ...args): Promise<any> {
    const sockets=this.io.sockets
    this.logger.log(`WS client with id: ${client.id} connected`)
  }

  handleDisconnect(client: any): any {
    const sockets=this.io.sockets
    this.logger.log(`Disconnected socket id: ${client.id}`)
  }

  @SubscribeMessage('create_video')
  listenCreateVideo(@MessageBody() content: string,@ConnectedSocket() socket: Socket) {
    this.io.emit('receive_create_video',content)
    return content
  }

  @SubscribeMessage('request_all_videos')
  async requestAllVideos(@MessageBody() content: string,@ConnectedSocket() socket: Socket){
    this.io.emit('send_all_videos',content)
    return content
  }

}
