import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MiddlewareConfig } from './midddleware.config';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request || !('headers' in request)) {
      throw new UnauthorizedException('Unauthorized');
    }

    const headers = request.headers as IncomingHttpHeaders;

    if (!headers.authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = this.extractTokenFromHeader(headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: MiddlewareConfig.jwt_secret
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractTokenFromHeader(authorizationHeader: string): string | undefined {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring(7); // Remove 'Bearer ' prefix
    }
    return undefined;
  }
}
