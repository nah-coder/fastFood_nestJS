import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Coupon } from './coupon.model';

@Table
export class UserCoupon extends Model<UserCoupon> {
    @Column({ type: DataType.STRING, defaultValue: false })
    isUsed!: string;

    @Column({ type: DataType.DATE })
    usedAt!: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Coupon)
    @Column({ type: DataType.INTEGER, allowNull: false })
    couponId!: number;

    @BelongsTo(() => Coupon)
    coupon!: Coupon;

}