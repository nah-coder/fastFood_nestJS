import { BelongsTo, Column, ForeignKey, DataType, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';
import { Order } from './order.model';

@Table
export class Review extends Model<Review> {
    @Column({ type: DataType.TEXT})
    comment!: string;

    @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1, max: 5 } })
    rating!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId!: number;

    @BelongsTo(() => Product)
    product!: Product;

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order;
}