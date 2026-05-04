import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCoupon } from './user-coupon.model';

export enum CouponTypes {
    PERCENTAGE = 'PERCENTAGE',
    FIXED_AMOUNT = 'FIXED_AMOUNT',
}

@Table
export class Coupon extends Model<Coupon> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    code!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.TEXT })
    description!: string;

    @Column({ type: DataType.ENUM, values: Object.values(CouponTypes), allowNull: false })
    type!: CouponTypes;

    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    value!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
    minOrderAmount!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    maxUses!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
    currentUses!: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActive!: boolean;

    @Column({ allowNull: false, type: DataType.DATE })
    validFrom!: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    validTo!: Date;

    @HasMany(() => UserCoupon)
    userCoupons!: UserCoupon[];
}