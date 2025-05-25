import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JWTPayload {
    userId: number | string;
    username: string;
    iat: number;
    exp: number;
  }
}
