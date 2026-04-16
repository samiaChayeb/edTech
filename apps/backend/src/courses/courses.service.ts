import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: { ...dto, authorId },
      include: { author: { select: { id: true, firstName: true, lastName: true } } },
    });
  }

  async findAll(status?: string) {
    return this.prisma.course.findMany({
      where: status ? { status: status as any } : { status: 'PUBLISHED' },
      include: {
        author: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { enrollments: true, lessons: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, firstName: true, lastName: true } },
        lessons: { orderBy: { order: 'asc' } },
        _count: { select: { enrollments: true } },
      },
    });
    if (!course) throw new NotFoundException('Cours non trouvé');
    return course;
  }

  async update(id: string, userId: string, role: string, dto: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (role !== 'ADMIN' && course.authorId !== userId) {
      throw new ForbiddenException('Vous ne pouvez modifier que vos propres cours');
    }
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string, role: string) {
    const course = await this.findOne(id);
    if (role !== 'ADMIN' && course.authorId !== userId) {
      throw new ForbiddenException();
    }
    return this.prisma.course.delete({ where: { id } });
  }

  async enroll(courseId: string, userId: string) {
    return this.prisma.enrollment.create({
      data: { courseId, userId, status: 'ACTIVE' },
    });
  }

  // ── Lessons ──
  async addLesson(courseId: string, data: { title: string; description?: string; order?: number }) {
    return this.prisma.lesson.create({ data: { ...data, courseId } });
  }

  async uploadVideo(lessonId: string, filePath: string) {
    return this.prisma.lesson.update({ where: { id: lessonId }, data: { videoUrl: filePath } });
  }
}
