import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
//import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
