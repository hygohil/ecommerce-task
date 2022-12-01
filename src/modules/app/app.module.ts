import { Module,MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GLOBAL_CONFIG } from "../../configs/global.config";
import { LoggerModule } from "../logger/logger.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { LoggerMiddleware } from "../../middlewares/logger.middleware";

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
