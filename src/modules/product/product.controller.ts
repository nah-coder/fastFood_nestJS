import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-produt.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('one/:id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get('all')
  async findAll(@Query() filterDto: FilterProductDto) {
    return this.productService.findAll(filterDto);
  }

  @Delete('soft/:id')
  async removeSoft(@Param('id') id: number) {
    return this.productService.removeSoft(id);
  }

  @Delete('hard/:id')
  async removeHard(@Param('id') id: number) {
    return this.productService.removeHard(id);
  }
}
