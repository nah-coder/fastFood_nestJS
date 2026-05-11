import { Sequelize } from 'sequelize-typescript';
import { CreateProductDto, ProductVariantDto } from './dto/create-produt.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CategoryService } from '../category/category.service';
import Helper from 'src/utils/helpers';
import { Product } from 'src/models/product.model';
import { Category, Ingredient, ProductIngredient, ProductVariant } from 'src/models';

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection()
    private readonly sequelize: Sequelize,
    private readonly categoryService: CategoryService,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(ProductVariant)
    private readonly productVariantModel: typeof ProductVariant,
    @InjectModel(Ingredient)
    private readonly ingredientModel: typeof Ingredient,
    @InjectModel(ProductIngredient)
    private readonly productIngredientModel: typeof ProductIngredient,
  ) {}

  async findOne(id: number) {
    return this.productModel.findByPk(id, {
      raw: true,
      include: [
        {
          model: ProductVariant,
          attributes: {
            include: [
            [this.sequelize.literal(`"Product"."basePrice"+"productVariants"."modifierPrice"`), 'variantPrice', ]
            ],
            exclude: ['createdAt', 'updatedAt', 'modifierPrice'],
          },
          
        },
        {
          model: Category,
          attributes: { exclude: ['name', 'slug'] },
        },
        {
          model: ProductIngredient,
          attributes: { exclude: ['quantity', 'isDefault'] },
          include: [
            {
              model: Ingredient,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findBySlug(slug: string) {
    return this.productModel.findOne({ where: { slug }, raw: true });
  }

  async create(createProductDto: CreateProductDto) {
    const t = await this.sequelize.transaction();
    try {
      const category = await this.categoryService.findOne(
        createProductDto.categoryId,
      );
      if (!category) {
        throw new Error('Category not found');
      }

      const productSlug = Helper.makeSlugFromString(createProductDto.name);

      const product = await this.findBySlug(productSlug);
      if (product) {
        throw new BadRequestException(
          'Product with the same name already exists',
        );
      }

      const payload: Record<string, any> = {
        name: createProductDto.name,
        description: createProductDto.description,
        basePrice: createProductDto.basePrice,
        categoryId: createProductDto.categoryId,
        slug: productSlug,
        isFeatured: createProductDto.isFeatured || false,
        imageUrl: createProductDto.imageUrl || null,
      };

      if (createProductDto.description)
        payload.description = createProductDto.description;
      const newProduct = await this.productModel.create(payload as any, {
        transaction: t,
      });

      if (
        createProductDto.productVariants &&
        createProductDto.productVariants.length > 0 &&
        newProduct
      ) {
        const productId = (newProduct.id ??
          newProduct.dataValues?.id) as number;
        const productVariants = createProductDto.productVariants.map(
          (productVariants: ProductVariantDto) => ({
            ...productVariants,
            productId,
          }),
        );
        await this.productVariantModel.bulkCreate(productVariants as any, {
          transaction: t,
        });
      }

      if (
        createProductDto.productIngredientIds &&
        createProductDto.productIngredientIds.length > 0 &&
        newProduct
      ) {
        const productId = (newProduct.id ??
          newProduct.dataValues?.id) as number;
        const ingredientIds = createProductDto.productIngredientIds.map(
          (ingredient) => ({
            productId,
            ingredientId: ingredient.ingredientId,
            quantity: ingredient.quantity,
            isDefault: ingredient.isDefault,
          }),
        );
        const alreadyExistIngredientIds = await this.ingredientModel.findAll({
          where: {
            id: ingredientIds,
          },
          attributes: ['id'],
          raw: true,
        });
        if (alreadyExistIngredientIds.length !== ingredientIds.length) {
          throw new BadRequestException('Some ingredient IDs are invalid');
        }

        const productIngredients = ingredientIds.map((ingredient) => ({
          ...ingredient,
          productId,
        }));
        await this.productIngredientModel.bulkCreate(
          productIngredients as any,
          {
            transaction: t,
          },
        );
      }

      // Create the product
      await t.commit();

      return { message: 'Product created successfully', product: newProduct };
    } catch (error) {
      console.log(error);
      await t.rollback();
      throw new BadRequestException('Failed to create product');
    }
  }
}
