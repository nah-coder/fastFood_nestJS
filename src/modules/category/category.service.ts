import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(categoryDto: CategoryDto): Promise<Category> {
    return await this.categoryModel.create(categoryDto as any);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }
}
