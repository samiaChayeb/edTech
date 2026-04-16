import { Controller, Get, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClassroomsService } from './classrooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Classrooms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/classrooms')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @Post()
  create(@Req() req: any, @Body() body: { name: string; description?: string }) {
    return this.classroomsService.create(req.user.sub, body);
  }

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(id);
  }

  @Post(':id/join')
  join(@Param('id') id: string, @Req() req: any) {
    return this.classroomsService.join(id, req.user.sub);
  }

  @Post(':id/leave')
  leave(@Param('id') id: string, @Req() req: any) {
    return this.classroomsService.leave(id, req.user.sub);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.classroomsService.getMessages(id);
  }
}
