import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;

    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException();

    try {
      const payload = this.jwt.verify(auth.slice(7));
      req.user = { userId: payload.sub, roles: payload.roles ?? [] };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
