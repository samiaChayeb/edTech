import {
  Controller, Get, Post, Delete, Param, Query,
  UseGuards, Req, UseInterceptors, UploadedFile, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { extname, join } from 'path';
import { tmpdir } from 'os';
import { Response } from 'express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const docStorage = diskStorage({
  destination: join(tmpdir(), 'uploads', 'documents'),
  filename: (_req: any, file: any, cb: any) => cb(null, `${uuid()}${extname(file.originalname)}`),
});

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: docStorage, limits: { fileSize: 50 * 1024 * 1024 } }))
  upload(@Req() req: any, @UploadedFile() file: Express.Multer.File, @Query('courseId') courseId?: string) {
    return this.documentsService.upload(req.user.sub, file, courseId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.documentsService.findAll(req.user.sub, req.user.role);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const doc = await this.documentsService.findOne(id);
    res.download(join(process.cwd(), doc.filePath), doc.originalName);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
