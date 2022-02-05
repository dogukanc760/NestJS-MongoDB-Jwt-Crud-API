import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from 'libs/filters/all-exception.filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // this for global url, for example : localhost:3000/api/
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
