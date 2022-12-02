import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from '../user/user.service';

import { RegisterUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  public async register(user: RegisterUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }
}
