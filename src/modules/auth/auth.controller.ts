import {
  Body,
  Controller,
  Post,
  Response,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { JWT_EXPIRY_SECONDS } from '../../shared/constants/global.constants';

import { AuthService } from './auth.service';
import {
  ActivateProfileDTO,
  AuthResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
} from './auth.dto';
import { JwtAuthGuard } from './auth.jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async login(
    @Body() user: LoginUserDTO,
    @Response() res,
  ): Promise<AuthResponseDTO> {
    const loginData = await this.authService.login(user);

    res.cookie('accessToken', loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });

    return res.status(200).send(loginData);
  }

  @Post('register')
  async register(@Body() user: RegisterUserDTO): Promise<User> {
    return this.authService.register(user);
  }

  @Put('activate')
  @ApiResponse({ description: 'Account activated successfully' })
  @ApiBody({ type: ActivateProfileDTO })
  async activate(
    @Body() body: ActivateProfileDTO,
    @Response() res,
  ): Promise<string> {
    await this.authService.activate(body);
    return res
      .status(200)
      .send({ message: 'Account activated successfully', success: true });
  }

  @Patch('resetPassword')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ description: 'Account reset password successfully' })
  @ApiBody({ type: ResetPasswordDTO })
  async resetPassword(
    @Body() body: ResetPasswordDTO,
    @Response() res,
  ): Promise<string> {
    await this.authService.resetPassword(body);
    res.clearCookie('accessToken');
    return res
      .status(200)
      .send({ message: 'Account reset password successfully', success: true });
  }
}
