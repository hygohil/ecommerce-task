import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../auth/auth.user.decorator';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

import { ShoppingPreferenceService } from './shoppingPreference.service';
import { ShoppingPreferenceDTO } from './shoppingPreference.dto';

@ApiTags('shoppingPreferences')
@Controller('/shoppingPreferences')
export class ShoppingPreferenceController {
  constructor(private shoppingPreferenceService: ShoppingPreferenceService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Add post data' })
  @ApiResponse({ type: ShoppingPreferenceDTO })
  async create(
    @Body()
    shoppingPreferenceData: {
      name: string;
    },
    @AuthUser() user: User,
  ): Promise<ShoppingPreferenceDTO> {
    const { name } = shoppingPreferenceData;
    return this.shoppingPreferenceService.create({
      name,
      user: {
        connect: { id: user.id },
      },
    });
  }
}
