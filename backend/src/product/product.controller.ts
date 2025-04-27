import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista de produtos',
  })
  @ApiQuery({ name: 'name', required: false, description: 'Filtra produtos por nome' })
  @Get()
  async findAll(@Query('name') name?: string) {
    return this.productService.findAll(name);
  }

  @ApiOperation({ summary: 'Buscar um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser buscado' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o produto encontrado',
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Dados do produto a serem criados',
    examples: {
      exemplo: {
        summary: 'Exemplo de Produto',
        value: {
          name: 'Produto Exemplo',
          price: 10.99,
          qty:3,
          categories: ['29dd952e-8b91-4a8e-9055-23d0fe4f287a'],
          photo: "https://http2.mlstatic.com/D_NQ_NP_2X_764857-MLA52988770506_122022-F.webp"
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso',
  })
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Atualizar um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser atualizado' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Novos dados do produto',
    examples: {
      exemplo: {
        summary: 'Exemplo de Produto Atualizado',
        value: {
          name: 'Produto Atualizado',
          price: 12.99,
          qty:3,
          categories: ['29dd952e-8b91-4a8e-9055-23d0fe4f287a'],
          photo: "https://http2.mlstatic.com/D_NQ_NP_2X_764857-MLA52988770506_122022-F.webp"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remover um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto a ser removido' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}