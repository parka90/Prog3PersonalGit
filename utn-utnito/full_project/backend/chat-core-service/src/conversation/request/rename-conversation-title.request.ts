import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RenameConversationTitleRequest {
  @ApiProperty({ example: 'REST endpoint questions' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  title: string;
}
