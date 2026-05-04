import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Product } from './product.model';
import { ProductVariant } from './product-varriant.model';
import { CartItemsIngredient } from './cart-item-ingredient.model';

@Table
export class CartItems extends Model<CartItems> {
    @ForeignKey(() => Cart)
    @Column({ type: DataType.INTEGER, allowNull: false })
    cartId!:number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId!:number;

    @BelongsTo(() => Product)
    product!: Product;

    @ForeignKey(() => ProductVariant)
    @Column({ type: DataType.INTEGER, allowNull: false })
    variantId!:number;

    @BelongsTo(() => ProductVariant)
    variant!: ProductVariant;

    @HasMany(() => CartItemsIngredient)
    cartItemsIngredients!: CartItemsIngredient[];
}