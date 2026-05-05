import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = new ConfigService();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // xóa các thuộc tính không có trong DTO
      forbidNonWhitelisted: true, // trả về lỗi nếu có thuộc tính không có trong DTO
      transform: true, // tự động chuyển đổi payload thành các kiểu dữ liệu đã định nghĩa trong DTO
      transformOptions: { enableImplicitConversion: true }, // cho phép chuyển đổi kiểu dữ liệu một cách ngầm định (ví dụ: "123" thành 123)
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new AllExceptionFilter());

  const port = configService.get<number>('PORT') || 5002;
  logger.log(`Starting server on port ${port}...`);
  await app.listen(port);
}
bootstrap();
