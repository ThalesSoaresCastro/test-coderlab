import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import validateEnv from './env-validate';

async function bootstrap() {
  validateEnv();
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create<NestApplication>(AppModule);
  await app.listen(port).then(()=>{
    console.log(`API server listening on port ${port}`);
  });
}
bootstrap();