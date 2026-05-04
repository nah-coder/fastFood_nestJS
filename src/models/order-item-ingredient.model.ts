import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { OrderItem } from './order-item.model';
import { Ingredient } from './ingredient.model';

@Table
export class OrderItemIngredient extends Model<OrderItemIngredient> {
    @ForeignKey(() => OrderItem)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderItemId!:number;

    @ForeignKey(() => Ingredient)
    @Column({ type: DataType.INTEGER, allowNull: false })
    ingredientId!:number;

    @BelongsTo(() => OrderItem)
    orderItem!: OrderItem;

    @BelongsTo(() => Ingredient)
    ingredient!: Ingredient;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;
}