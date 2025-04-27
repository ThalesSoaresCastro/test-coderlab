import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { Prisma } from '@prisma/client';

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
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        categories: {
          connect: createProductDto.categories?.map((id) => ({ id })),
        },
      },
      include: { categories: true },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
          categories: {
            set: updateProductDto.categories?.map((id) => ({ id })),
          },
        },
        include: { categories: true },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}