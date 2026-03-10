export interface JwtPayload {
  sub: string;
  username: string;
  displayName: string;
  role: string;
  tokenType: 'access' | 'refresh';
}
