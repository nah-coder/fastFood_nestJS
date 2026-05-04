import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from './category.model';
import { OrderItemIngredient } from './order-item-ingredient.model';
import { CartItemsIngredient } from './cart-item-ingredient.model';

@Table
export class Ingredient extends Model<Ingredient> {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    imageURL!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    price!: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive!: boolean;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isRequired!: boolean;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    categoryId!: number;

    @BelongsTo(() => Category)
    category!: Category;

    @HasMany(() => OrderItemIngredient)
    orderItemIngredients!: OrderItemIngredient[];

    @HasMany(() => CartItemsIngredient)
    cartItemsIngredients!: CartItemsIngredient[];
}