import { Controller, Get, Response, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../auth/auth.user.decorator';

import { UserService } from './user.service';
import { UserResponseDTO } from './user.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get user data' })
  @ApiResponse({ type: UserResponseDTO })
  async getUser(
    @AuthUser() user: User,
    @Response() res,
  ): Promise<UserResponseDTO> {
    return res.status(200).send({ user });
  }
}
