import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';

import { PrismaService } from '../prisma/prisma.service';

import { ShoppingPreferenceController } from './shoppingPreference.controller';
import { ShoppingPreferenceService } from './shoppingPreference.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  controllers: [ShoppingPreferenceController],
  providers: [ShoppingPreferenceService, PrismaService],
  exports: [ShoppingPreferenceService],
})
export class ShoppingPreferenceModule {}
