import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query,
  UseGuards, Req, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { extname, join } from 'path';
import { tmpdir } from 'os';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

const videoStorage = diskStorage({
  destination: join(tmpdir(), 'uploads', 'videos'),
  filename: (_req, file, cb) => cb(null, `${uuid()}${extname(file.originalname)}`),
});

@ApiTags('Courses')
@Controller('api/courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.coursesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @Post()
  create(@Req() req: any, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(req.user.sub, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(id, req.user.sub, req.user.role, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.remove(id, req.user.sub, req.user.role);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/enroll')
  enroll(@Param('id') id: string, @Req() req: any) {
    return this.coursesService.enroll(id, req.user.sub);
  }

  // ── Video Upload ──
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @Post('lessons/:lessonId/video')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video', { storage: videoStorage, limits: { fileSize: 500 * 1024 * 1024 } }))
  uploadVideo(@Param('lessonId') lessonId: string, @UploadedFile() file: Express.Multer.File) {
    return this.coursesService.uploadVideo(lessonId, file.path);
  }
}
