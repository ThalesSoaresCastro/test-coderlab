import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(name?: string) {
    const where = name ? { name: { contains: name } } : {};
    return this.prisma.product.findMany({
      where,
      include: {
        categories: true,
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