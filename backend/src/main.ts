  import { NestFactory, NestApplication } from '@nestjs/core';
  import { AppModule } from './app.module';
  import validateEnv from './env-validate';
  import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

  async function bootstrap() {
    validateEnv();
    const port = process.env.API_PORT ?? 3000;
    const app = await NestFactory.create<NestApplication>(AppModule);
    const config = new DocumentBuilder()
    .setTitle('Categories and Products API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

    await app.listen(port).then(()=>{
      console.log(`API server listening on port ${port}`);
      console.log(`API Documentation access in http://localhost:${port}/api`);
    });
  }
  bootstrap();