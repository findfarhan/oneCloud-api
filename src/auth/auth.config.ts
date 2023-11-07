import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthConfig {
  public jwt_secret: string = process.env.JWT_SECRET;

}
