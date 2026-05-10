import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import Helper from 'src/utils/helpers';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(categoryDto: CategoryDto) {
    const alreadyExists = await this.categoryModel.findOne({
      where: { slug: Helper.makeSlugFromString(categoryDto.name) },
    });

    if (alreadyExists) {
      throw new BadRequestException('Category with this name already exists');
    }

    await this.categoryModel.create(categoryDto as any);

    return { message: 'Category created successfully' };
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({
      where: { isActive: true },
      order: [['sortOrder', 'ASC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
        // include: ['id', 'name', 'slug', 'description', 'sortOrder']
      },
    });
  }

  async update(id: number, categoryDto: UpdateCategoryDto) {
    const alreadyExists = await this.categoryModel.findByPk(id);

    if (!alreadyExists) {
      throw new BadRequestException(`Category with id ${id} not found`);
    }

    await alreadyExists.update(categoryDto);

    return { message: 'Category updated successfully' };
  }

  async delete(id: number) {
    await this.categoryModel.destroy({ where: { id }, cascade: true });

    return { message: 'Category deleted successfully' };
  }

  async findOne(id: number) {
    return await this.categoryModel.findByPk(id, { raw: true });
  }
}
