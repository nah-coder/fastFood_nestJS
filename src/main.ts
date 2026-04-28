import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = new ConfigService();

  const port = configService.get<number>('PORT') || 5002;
  logger.log(`Starting server on port ${port}...`);
  await app.listen(port);
}
bootstrap();
