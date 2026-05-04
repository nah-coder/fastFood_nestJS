import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Address } from './address.model';
import { OrderItem } from './order-item.model';
import { Review } from './review.model';

export enum OrderStatus {
    PENDING = 'Đang chờ',
    CONFIRMED = 'Đã xác nhận',
    PREPARING = 'Đang chuẩn bị',
    DELIVERING = 'Đang giao',
    COMPLETED = 'Hoàn thành',
    CANCELLED = 'Đã hủy',
    READY = 'Sẵn sàng',
    DELIVERED = 'Đã giao',
}

export enum PaymentMethod {
    CASH = 'Thanh toán khi nhận hàng',
    ONLINE = 'Thanh toán Online',
}

export enum PaymentStatus {
    PAID = 'Đã thanh toán',
    FAILED = 'Thanh toán thất bại',
    PENDING = 'Đang chờ thanh toán',
    REFUNDED = 'Hoàn tiền'
}

@Table
export class Order extends Model<Order> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    orderNumber!: string;

    @Column({ type: DataType.ENUM, values: Object.values(OrderStatus) })
    status!: OrderStatus;

    @Column({ type: DataType.ENUM, values: Object.values(PaymentStatus) })
    paymentStatus!: PaymentStatus;

    @Column({ type: DataType.ENUM, values: Object.values(PaymentMethod) })
    paymentMethod!: PaymentMethod; 

    @Column({ type: DataType.INTEGER, allowNull: false })
    subTotal!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    deliveryFee!: number;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    discount!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    total!: number;

    @Column({ type: DataType.TEXT, allowNull: true })
    notes!: string;
    //relationships

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!:number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Address)
    @Column({ type: DataType.INTEGER, allowNull: false })
    addressId!:number;

    @BelongsTo(() => Address)
    address!: Address;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];

    @HasMany(() => Review)
    reviews!: Review[];
}