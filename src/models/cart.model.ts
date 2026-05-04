import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { CartItems } from './cart-items.model';

@Table
export class Cart extends Model<Cart> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!:number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => CartItems)
    cartItems!: CartItems[];
}