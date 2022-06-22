import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  isEmpty,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class ImageCaptchaDto {
  @ApiProperty({
    required: false,
    default: 100,
    description: '验证码宽度',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly width: number = 100;

  @ApiProperty({
    required: false,
    default: 50,
    description: '验证码宽度',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly height: number = 50;
}

export class LoginInfoDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @MinLength(4)
  password: string;

  // @ApiProperty({ description: '验证码标识' })
  // @IsString()
  // captchaId: string;

  // @ApiProperty({ description: '用户输入的验证码' })
  // @IsString()
  // @MinLength(4)
  // @MaxLength(4)
  // verifyCode: string;
}

export class RegisterInfoDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  @MinLength(4)
  @MaxLength(16)
  password: string;

  // @ApiProperty({ required: false, description: '手机号' })
  // @IsString()
  // @IsOptional()
  // phone: string;

  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, description: '验证码' })
  @IsString()
  @Length(4, 4)
  code: string;

  @ApiProperty({ required: false, description: 'QQ' })
  @IsString()
  @Matches(/^[0-9]+$/)
  @MinLength(5)
  @MaxLength(11)
  @IsOptional()
  qq: string;
}
export class sendCodeDto {
  @ApiProperty({ description: '邮箱' })
  @IsEmail({ message: '邮箱格式不正确' })
  email: string;

  // @ApiProperty({ description: '验证码标识' })
  // @IsString({ message: '请输入验证码标识' })
  // captchaId: string;

  // @ApiProperty({ description: '用户输入的验证码' })
  // @IsString({ message: '请输入验证码' })
  // @MinLength(4)
  // @MaxLength(4)
  // verifyCode: string;
}
