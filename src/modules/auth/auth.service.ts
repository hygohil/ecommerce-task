import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';

import {
  ActivateProfileDTO,
  AuthResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      email: loginUserDTO.email,
    });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const isMatch = await AuthHelpers.verify(
      loginUserDTO.password,
      userData.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: null,
      DOB: userData.DOB,
      isActive: userData.isActive,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }

  public async register(user: RegisterUserDTO): Promise<User> {
    return this.userService.createUser(user);
  }

  public async activate({ userId }: ActivateProfileDTO) {
    const user = await this.userService.findByUserIdAndUpdate(userId, {
      isActive: true,
    });
    return user;
  }

  public async resetPassword({ userId, password }: ResetPasswordDTO) {
    await this.userService.updateUserById(userId, { password: password });
  }
}
