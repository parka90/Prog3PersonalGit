import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from './model/auth-user.model';

@Injectable()
export class AuthUsersService {
  private readonly logger = new Logger(AuthUsersService.name);
  private users: AuthUser[] = [];

  constructor(private readonly configService: ConfigService) {
    this.users = this.parseAuthUsers();
  }

  getByUsername(username: string): AuthUser | undefined {
    return this.users.find((user) => user.username === username);
  }

  getByUserId(userId: string): AuthUser | undefined {
    return this.users.find((user) => user.userId === userId);
  }

  private parseAuthUsers(): AuthUser[] {
    const rawUsers = this.configService.get<string>('AUTH_USERS_JSON', '[]');

    try {
      const parsed = JSON.parse(rawUsers) as AuthUser[];
      const validUsers = parsed.filter(
        (user) =>
          user?.userId &&
          user?.username &&
          user?.displayName &&
          user?.password &&
          user?.role,
      );

      if (!validUsers.length) {
        throw new Error('No valid users found in AUTH_USERS_JSON');
      }

      return validUsers;
    } catch (error) {
      this.logger.error(`Invalid AUTH_USERS_JSON value: ${error.message}`);
      throw new UnauthorizedException('Auth users are not configured correctly');
    }
  }
}
