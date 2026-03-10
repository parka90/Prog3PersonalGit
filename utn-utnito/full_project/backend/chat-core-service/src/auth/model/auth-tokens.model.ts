import { ApiProperty } from '@nestjs/swagger';

export class AuthTokens {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ example: 3600 })
  expiresIn: number;
}
