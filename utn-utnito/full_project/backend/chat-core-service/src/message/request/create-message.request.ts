import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageRequest {
  @ApiProperty({
    example: 'Can you explain Sprint 2 backend goals?',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  content: string;
}
