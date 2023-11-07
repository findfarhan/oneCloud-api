import { Injectable } from '@nestjs/common';

@Injectable()
export class MiddlewareConfig {
  static jwt_secret: string = process.env.JWT_SECRET; 
}
