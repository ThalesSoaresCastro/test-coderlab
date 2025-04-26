import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { CorsMiddleware } from './middlewares/cors.middleware';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer){
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }
}
