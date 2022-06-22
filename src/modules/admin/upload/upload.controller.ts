import { Controller, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { ApiTags } from '@nestjs/swagger';
import {
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getName,
  getSize,
  saveFile,
} from '@/utils/file.util';
import { StorageService } from '../tools/storage/storage.service';
import { AdminUser } from '../core/decorators/admin-user.decorator';
import { IAdminUser } from '../admin.interface';

@ApiTags('上传模块')
@Controller('upload')
export class UploadController {
  constructor(private storageService: StorageService) {}

  @Post()
  async upload(@Req() req: FastifyRequest, @AdminUser() user: IAdminUser) {
    const file: MultipartFile = await req.file();
    const fileName = file.filename;
    const size = getSize(file.file.bytesRead);
    const extName = getExtname(fileName);
    const type = getFileType(extName);

    const name = fileRename(fileName);
    const path = getFilePath(name);

    saveFile(file, name);
    this.storageService.save({
      name: getName(fileName),
      fileName,
      extName,
      path,
      type,
      size,
      userId: user?.uid,
    });

    return {
      filename: path,
    };
  }
}
