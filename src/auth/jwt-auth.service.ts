import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';
import { AuthConfig } from './auth.config';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authConfig: AuthConfig,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, name: user.email };
    const options = {
      expiresIn: '1h', 
      secret: this.authConfig.jwt_secret, 
    };

    return this.jwtService.sign(payload,options);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
