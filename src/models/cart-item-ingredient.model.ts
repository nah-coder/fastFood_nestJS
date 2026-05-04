import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { CartItems } from './cart-items.model';

@Table
export class CartItemsIngredient extends Model<CartItemsIngredient> {
    @ForeignKey(() => CartItems)
    @Column({ type: DataType.INTEGER, allowNull: false })
    cartItemId!:number;

    @ForeignKey(() => Ingredient)
    @Column({ type: DataType.INTEGER, allowNull: false })
    ingredientId!:number;

    @BelongsTo(() => CartItems)
    cartItem!: CartItems;

    @BelongsTo(() => Ingredient)
    ingredient!: Ingredient;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;
}