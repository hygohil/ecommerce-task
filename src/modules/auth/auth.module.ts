import { Module } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
  ],
  providers: [UserService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
