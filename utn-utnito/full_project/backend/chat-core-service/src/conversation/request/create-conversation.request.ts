import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateConversationRequest {
  @ApiPropertyOptional({
    example: 'Final project planning',
    description: 'Optional custom title for the new conversation',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  title?: string;
}
