import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import ToolStorage from '@/entities/admin/tool-storage.entity';
import { CreateStorageDto, PageSearchStorageDto } from './storage.dto';
import { deleteFile } from '@/utils/file.util';
import { StorageInfo } from './storage.class';
import SysUser from '@/entities/admin/sys-user.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(ToolStorage)
    private storageRepository: Repository<ToolStorage>,
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
  ) {}

  /**
   * 保存文件上传记录
   */
  async save(file: CreateStorageDto & { userId: number }): Promise<void> {
    await this.storageRepository.save({
      name: file.name,
      fileName: file.fileName,
      extName: file.extName,
      path: file.path,
      type: file.type,
      size: file.size,
      userId: file.userId,
    });
  }

  /**
   * 删除文件
   */
  async delete(fileIds: number[]): Promise<void> {
    const items = await this.storageRepository.findByIds(fileIds);
    await this.storageRepository.delete(fileIds);

    items.forEach((el) => {
      deleteFile(el.path);
    });
  }

  async page(dto: PageSearchStorageDto): Promise<StorageInfo[]> {
    const { page, pageSize, name, type, size, extName, time, username } = dto;

    const where = {
      ...(name ? { name: Like(`%${name}%`) } : null),
      ...(type ? { type: type } : null),
      ...(extName ? { extName: extName } : null),
      ...(size ? { size: Between(size[0], size[1]) } : null),
      ...(time ? { createdAt: Between(time[0], time[1]) } : null),
    };

    if (username) {
      const user = await this.userRepository.findOne({ username: username });
      where['userId'] = user?.id;
    }

    const result = await this.storageRepository
      .createQueryBuilder('storage')
      .leftJoinAndSelect('sys_user', 'user', 'storage.user_id = user.id')
      .where(where)
      .orderBy('storage.created_at', 'DESC')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();

    return result.map((e) => {
      return {
        id: e.storage_id,
        name: e.storage_name,
        extName: e.storage_ext_name,
        path: e.storage_path,
        type: e.storage_type,
        size: e.storage_size,
        createdAt: e.storage_created_at,
        username: e.user_username,
      };
    });
  }

  async count(): Promise<number> {
    return await this.storageRepository.count();
  }
}
