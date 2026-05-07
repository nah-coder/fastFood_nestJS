import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Nếu có bảo mật bằng JWT, thêm dòng này để hiển thị nút "Authorize" trong Swagger
@ApiTags('Danh mục')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse ({ status: HttpStatus.CREATED, description: 'Category created successfully' })
  @ApiResponse ({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse ({ status: HttpStatus.CONFLICT, description: 'Slug already exists' })
  @ApiOperation({ summary: 'Create a new category' })
  
  @Post('create')
  async createCategory(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.create(categoryDto);
  }

  @ApiResponse ({ status: HttpStatus.OK, description: 'Categories retrieved successfully' })
  @Get('all')
  async getAllCategories() {
    return await this.categoryService.findAll();
  }

  @ApiResponse ({ status: HttpStatus.OK, description: 'Category updated successfully' })
  @ApiResponse ({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  @Patch('update/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @ApiResponse ({ status: HttpStatus.OK, description: 'Category deleted successfully' })
  @ApiResponse ({ status: HttpStatus.NOT_FOUND, description: 'Category not found' })
  @Delete('delete/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.delete(id);
  }

  // @Get('one/:id')
  // async getCategoryById(@Param('id', ParseIntPipe) id: number) {
  //   return await this.categoryService.findById(id);
  // }
}
