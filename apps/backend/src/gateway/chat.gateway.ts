import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');

  constructor(private prisma: PrismaService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { classroomId: string }) {
    client.join(data.classroomId);
    this.server.to(data.classroomId).emit('userJoined', { socketId: client.id });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { classroomId: string }) {
    client.leave(data.classroomId);
    this.server.to(data.classroomId).emit('userLeft', { socketId: client.id });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { classroomId: string; userId: string; content: string },
  ) {
    const message = await this.prisma.message.create({
      data: { classroomId: data.classroomId, userId: data.userId, content: data.content },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
    });
    this.server.to(data.classroomId).emit('newMessage', message);
  }
}
