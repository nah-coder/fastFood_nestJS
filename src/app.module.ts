import { SequelizeModuleOptions } from './../node_modules/@nestjs/sequelize/dist/interfaces/sequelize-options.interface.d';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { CategoryModule } from './modules/category/category.module';
import { StartTimingMiddleware } from './common/middlewares/start-timing.middlewwares';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
        sequelizeConfig(configService),
    }),
    CategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(StartTimingMiddleware).forRoutes({path: '*', method:RequestMethod.ALL});
  }
}
