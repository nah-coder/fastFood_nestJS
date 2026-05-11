import {
  ArrayNotRequired,
  BooleanNotRequired,
  EnumRequired,
  NumberRequired,
  StringRequired,
} from 'src/decorator';
import {
  ProductVariantSize,
  ProductVariantType,
} from 'src/models/product-varriant.model';

export class ProductVariantDto {
  @StringRequired('Variant name is required')
  name!: string;

  @EnumRequired(ProductVariantSize, 'Size is required')
  size!: ProductVariantSize;

  @EnumRequired(ProductVariantType, 'Type is required')
  type!: ProductVariantType;

  @NumberRequired('Price modifier is required')
  modifiedPrice!: number;

  @NumberRequired('Product ID is required', 1)
  productId!: number;
}

export class ProductIngredientDto {
  @NumberRequired('Ingredient ID is required', 1)
  ingredientId!: number;

  @NumberRequired('Product ID is required', 1)
  quantity!: number;

  @BooleanNotRequired('Default is optional')
  isDefault?: boolean; // Assuming you want to add a default boolean field to indicate if this ingredient is a default ingredient for the product
}

export class CreateProductDto {
  @StringRequired('Name is required')
  name!: string;

  @StringRequired('Description is required')
  description?: string;

  @NumberRequired('Base price is required')
  basePrice!: number;

  @NumberRequired('Category ID is required', 1)
  categoryId!: number;

  @BooleanNotRequired('Is featured is optional') // Assuming you want to add an optional boolean field
  isFeatured?: boolean;

  @ArrayNotRequired(
    'Product variants must be an array of ProductVariantDto',
    ProductVariantDto,
  )
  productVariants?: ProductVariantDto[];

  @ArrayNotRequired(
    'Ingredient IDs must be an array of numbers',
    ProductIngredientDto,
  )
  productIngredientIds?: ProductIngredientDto[]; // Assuming you want to add an array of ingredient IDs without validation for now

  @StringRequired('Image URL is required') // Assuming you want to add an optional string field for image URL
  imageUrl?: string; // Optional field for product image URL
}
