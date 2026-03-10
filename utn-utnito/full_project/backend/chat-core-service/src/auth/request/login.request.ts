import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ example: 'carlos.gardel' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(1)
  password: string;
}
