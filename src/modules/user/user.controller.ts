import { Controller, Get, Response, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../auth/auth.user.decorator';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

import { UserService } from './user.service';
import { UserResponseDTO } from './user.dto';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get user data' })
  @ApiResponse({ type: UserResponseDTO })
  async getUser(
    @AuthUser() authUser: User,
    @Response() res,
  ): Promise<UserResponseDTO> {
    const user = await this.userService.getUserById(authUser.id);
    return res.status(200).send({ user });
  }
}
