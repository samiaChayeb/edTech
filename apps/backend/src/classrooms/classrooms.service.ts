import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassroomsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, data: { name: string; description?: string }) {
    return this.prisma.classroom.create({
      data: { ...data, ownerId },
      include: { owner: { select: { id: true, firstName: true, lastName: true } } },
    });
  }

  async findAll() {
    return this.prisma.classroom.findMany({
      where: { isActive: true },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { participants: true, messages: true } },
      },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.classroom.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
      },
    });
    if (!room) throw new NotFoundException('Salle non trouvée');
    return room;
  }

  async join(classroomId: string, userId: string) {
    return this.prisma.classroomParticipant.upsert({
      where: { userId_classroomId: { userId, classroomId } },
      update: {},
      create: { userId, classroomId },
    });
  }

  async leave(classroomId: string, userId: string) {
    return this.prisma.classroomParticipant.delete({
      where: { userId_classroomId: { userId, classroomId } },
    });
  }

  async getMessages(classroomId: string, take = 50) {
    return this.prisma.message.findMany({
      where: { classroomId },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
      take,
    });
  }

  async createMessage(classroomId: string, userId: string, content: string) {
    return this.prisma.message.create({
      data: { classroomId, userId, content },
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
    });
  }
}
