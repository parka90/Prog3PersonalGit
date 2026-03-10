import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthUsersService } from './auth-users.service';
import { LoginRequest } from './request/login.request';
import { RefreshTokenRequest } from './request/refresh-token.request';
import { AuthTokens } from './model/auth-tokens.model';
import { JwtPayload } from './model/jwt-payload.model';
import { AuthUser } from './model/auth-user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authUsersService: AuthUsersService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<AuthTokens> {
    const user = this.authUsersService.getByUsername(loginRequest.username);

    if (!user || !(await this.isPasswordValid(loginRequest.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildTokens(user);
  }

  async refreshToken(tokenRefreshRequest: RefreshTokenRequest): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(tokenRefreshRequest.refreshToken, {
        secret: this.getJwtSecret(),
      });

      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = this.authUsersService.getByUserId(payload.sub);
      if (!user || user.username !== payload.username) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return {
        accessToken: this.signAccessToken(user),
        expiresIn: this.toSeconds(this.getAccessTokenExpiration()),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getCurrentUser(payload: JwtPayload): Promise<{ userId: string; username: string; displayName: string; role: string }> {
    const user = this.authUsersService.getByUserId(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    return {
      userId: user.userId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };
  }

  async validateJwtPayload(payload: JwtPayload): Promise<JwtPayload> {
    const user = this.authUsersService.getByUserId(payload.sub);

    if (!user || user.username !== payload.username || payload.tokenType !== 'access') {
      throw new UnauthorizedException('Invalid token payload');
    }

    return payload;
  }

  getJwtSecret(): string {
    return this.configService.get<string>('AUTH_APP_SALT', 'utnito-auth-salt');
  }

  private buildTokens(user: AuthUser): AuthTokens {
    return {
      accessToken: this.signAccessToken(user),
      refreshToken: this.signRefreshToken(user),
      expiresIn: this.toSeconds(this.getAccessTokenExpiration()),
    };
  }

  private signAccessToken(user: AuthUser): string {
    const payload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      tokenType: 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.getJwtSecret(),
      expiresIn: this.toSeconds(this.getAccessTokenExpiration()),
    });
  }

  private signRefreshToken(user: AuthUser): string {
    const payload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
      tokenType: 'refresh',
    };

    return this.jwtService.sign(payload, {
      secret: this.getJwtSecret(),
      expiresIn: this.toSeconds(this.getRefreshTokenExpiration()),
    });
  }

  private getAccessTokenExpiration(): string {
    return this.configService.get<string>('AUTH_TOKEN_EXPIRATION', '1h');
  }

  private getRefreshTokenExpiration(): string {
    return this.configService.get<string>('AUTH_REFRESH_TOKEN_EXPIRATION', '1d');
  }

  private toSeconds(expiration: string): number {
    const match = expiration.trim().match(/^(\d+)([smhd])$/i);

    if (!match) {
      return 3600;
    }

    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      default:
        return 3600;
    }
  }

  private async isPasswordValid(providedPassword: string, storedPassword: string): Promise<boolean> {
    if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$')) {
      return bcrypt.compare(providedPassword, storedPassword);
    }

    return providedPassword === storedPassword;
  }
}
