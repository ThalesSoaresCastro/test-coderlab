import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
