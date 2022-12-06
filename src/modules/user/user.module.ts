import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/shared/constants/global.constants';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserListener } from './user.listener';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserListener],
  exports: [UserService],
})
export class UserModule {}
