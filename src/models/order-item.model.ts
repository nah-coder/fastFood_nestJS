import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';
import { User } from './user.model';
import { Order } from './order.model';
import { Product } from './product.model';
import { ProductVariant } from './product-varriant.model';
import { OrderItemIngredient } from './order-item-ingredient.model';

@Table
export class OrderItem extends Model<OrderItem> {
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId!:number;

    @BelongsTo(() => Order)
    order!: Order;

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

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;

    @HasMany(() => OrderItemIngredient)
    orderItemIngredients!: OrderItemIngredient[];
}