import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'libs/guards/auth.guard';
import { LibsModule } from 'libs/libs.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import environment from 'tools/environment/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TotalModule } from './total/total.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule,
    LibsModule,
    TotalModule,
    MongooseModule.forRoot(environment.mongoUrl),
    TotalModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
