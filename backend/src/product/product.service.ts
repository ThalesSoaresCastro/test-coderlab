import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(name?: string) {
    const where: Prisma.ProductWhereInput = name
      ? {
          name: {
            contains: name,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        }
      : {};
    return this.prisma.product.findMany({
      where,
      include: {
        categories: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new NotFoundException(`ID is not valid.`);
    }
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  private async validateCategories(categoryIds: string[]): Promise<void> {
    if (categoryIds && categoryIds.length > 0) {
      const invalidCategoryIds = categoryIds.filter((id) => !isUUID(id));
      if (invalidCategoryIds.length > 0) {
        throw new NotFoundException(
          `Invalid categories id's: ${invalidCategoryIds.join(', ')}`,
        );
      }

      const foundCategories = await this.prisma.category.findMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });

      if (foundCategories.length !== categoryIds.length) {
        const notFoundIds = categoryIds.filter(
          (id) => !foundCategories.some((cat) => cat.id === id),
        );
        throw new NotFoundException(
          `Invalid categories id's: ${notFoundIds.join(', ')}`,
        );
      }
    }
  }

  async create(createProductDto: CreateProductDto) {
    const { categories, ...productData } = createProductDto;

    categories && categories?.length > 0 && await this.validateCategories(categories);

    return this.prisma.product.create({
      data: {
        ...productData,
        categories: {
          connect: categories?.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!isUUID(id)) {
      throw new NotFoundException(`Invalid product id.`);
    }

    const productExists = await this.prisma.product.findUnique({ where: { id } });
    if (!productExists) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    const { categories, ...productData } = updateProductDto;

    categories && categories?.length > 0 && await this.validateCategories(categories);

    return await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        categories: {
          set: categories?.map((catId) => ({ id: catId })),
        },
      },
      include: { categories: true },
    });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new NotFoundException(`ID is not valid.`);
    }
    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return { message: `Product deleted.` };
  }
}