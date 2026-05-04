import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Ingredient } from './ingredient.model';

@Table
export class ProductIngredient extends Model<ProductIngredient> {
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault!: boolean;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId!: number;

  @ForeignKey(() => Ingredient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ingredientId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;
}
