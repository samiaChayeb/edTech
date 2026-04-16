import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async upload(userId: string, file: Express.Multer.File, courseId?: string) {
    const docType = this.getDocType(file.mimetype);
    return this.prisma.document.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        type: docType,
        filePath: file.path,
        userId,
        courseId,
      },
    });
  }

  async findAll(userId: string, role: string) {
    if (role === 'ADMIN') return this.prisma.document.findMany({ orderBy: { createdAt: 'desc' } });
    return this.prisma.document.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Document non trouvé');
    return doc;
  }

  async remove(id: string) {
    return this.prisma.document.delete({ where: { id } });
  }

  private getDocType(mime: string): any {
    if (mime === 'application/pdf') return 'PDF';
    if (mime.includes('word') || mime.includes('doc')) return 'DOC';
    if (mime.startsWith('image/')) return 'IMAGE';
    return 'OTHER';
  }
}
