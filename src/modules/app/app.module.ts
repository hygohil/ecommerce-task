import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GLOBAL_CONFIG } from '../../configs/global.config';
import { LoggerModule } from '../logger/logger.module';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ShoppingPreferenceModule } from '../shoppingPreference/shoppingPreference.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    AuthModule,
    PrismaModule,
    ShoppingPreferenceModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
