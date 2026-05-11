import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderItem } from './order-item.model';
import { CartItems } from './cart-items.model';
import { Review } from './review.model';
import { ProductVariant } from './product-varriant.model';
import { ProductIngredient } from './product-ingredient.model';

@Table
export class Product extends Model<Product> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  basePrice!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFeatured!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl!: string;

  @Column({ type: DataType.VIRTUAL(DataType.INTEGER) })
  variantPrice!: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

  //relationships
  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];

  @HasMany(() => CartItems)
  cartItems!: CartItems[];

  @HasMany(() => Review)
  reviews!: Review[];

  @HasMany(() => ProductVariant)
  productVariants!: ProductVariant[];

  @HasMany(() => ProductIngredient)
  productIngredients!: ProductIngredient[];
}
