import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';
import { Order } from './order.model';
import { Cart } from './cart.model';
import { UserCoupon } from './user-coupon.model';
import { Review } from './review.model';

export enum UserRoles{
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    avatar!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    phone!: string;

    @Column({ type: DataType.ENUM(...Object.values(UserRoles)), defaultValue: UserRoles.CUSTOMER, allowNull: false })
    role!: UserRoles;

    @Column({ type: DataType.STRING, allowNull: true })
    provider!: string;

    //relationships
    @HasMany(() => Order)
    orders!: Order[];

    @HasMany(() => Address)
    addresses!: Address[];

    @HasOne(() => Cart)
    cart!: Cart;

    @HasMany(() => UserCoupon)
    userCoupons!: UserCoupon[];

    @HasMany(() => Review)
    reviews!: Review[];
}