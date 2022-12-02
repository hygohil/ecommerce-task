import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super(reflector);
  }

  handleRequest(err: Error, user: User): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
