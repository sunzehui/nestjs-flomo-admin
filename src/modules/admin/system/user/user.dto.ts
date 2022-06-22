import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { PageOptionsDto } from '@/common/dto/page.dto';

export class UpdateUserInfoDto {
  @ApiProperty({
    required: false,
    description: '用户呢称',
  })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({
    required: false,
    description: '用户邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '用户手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    required: false,
    description: '用户备注',
  })
  @IsString()
  @IsOptional()
  remark: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ description: '更改前的密码' })
  @IsString()
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  originPassword: string;

  @ApiProperty({ description: '更改后的密码' })
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  newPassword: string;
}

export class CreateUserDto {
  @ApiProperty({ description: '登录账号' })
  @IsString()
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '更改后的密码' })
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z\W_]+$/)
  password: string;

  @ApiProperty({ description: '归属角色', type: [Number] })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles: number[];

  @ApiProperty({
    required: false,
    description: '呢称',
  })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    required: false,
    description: 'QQ',
  })
  @IsString()
  @Matches(/^[0-9]+$/)
  @MinLength(5)
  @MaxLength(11)
  @IsOptional()
  qq: string;

  @ApiProperty({
    required: false,
    description: '备注',
  })
  @IsString()
  @IsOptional()
  remark: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ description: '用户ID' })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoUserDto {
  @ApiProperty({ description: '用户ID' })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class DeleteUserDto {
  @ApiProperty({ description: '需要删除的用户ID列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class PageSearchUserDto extends PageOptionsDto {
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: '昵称' })
  @IsString()
  @IsOptional()
  nickName: string;

  @ApiProperty({ description: 'qq' })
  @IsString()
  @IsOptional()
  qq: string;

  @ApiProperty({ description: '邮箱' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  status: number;
}

export class PasswordUserDto {
  @ApiProperty({ description: '管理员ID' })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: '更改后的密码' })
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]{6,16}$/, { message: '密码格式不正确' })
  password: string;
}

export class UserExistDto {
  @ApiProperty({ description: '登录账号' })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(6)
  @MaxLength(20)
  username: string;
}
