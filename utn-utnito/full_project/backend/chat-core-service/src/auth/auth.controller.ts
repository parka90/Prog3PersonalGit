import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AbstractController } from 'src/basic/abstract.controller';
import { ResponseObject } from 'src/basic/response-object';
import { AuthService } from './auth.service';
import { AuthTokens } from './model/auth-tokens.model';
import { LoginRequest } from './request/login.request';
import { RefreshTokenRequest } from './request/refresh-token.request';
import { JwtPayload } from './model/jwt-payload.model';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends AbstractController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return access/refresh tokens' })
  async login(@Body() loginRequest: LoginRequest): Promise<ResponseObject<AuthTokens>> {
    const tokens = await this.authService.login(loginRequest);
    return this.createOkResponse(tokens);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  async refreshToken(
    @Body() refreshTokenRequest: RefreshTokenRequest,
  ): Promise<ResponseObject<{ accessToken: string; expiresIn: number }>> {
    const tokenResponse = await this.authService.refreshToken(refreshTokenRequest);
    return this.createOkResponse(tokenResponse);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwtAuth')
  @ApiOperation({ summary: 'Get current authenticated user' })
  async getMe(
    @Req() request: Request & { user: JwtPayload },
  ): Promise<ResponseObject<{ userId: string; username: string; displayName: string; role: string }>> {
    const user = await this.authService.getCurrentUser(request.user);
    return this.createOkResponse(user);
  }
}
