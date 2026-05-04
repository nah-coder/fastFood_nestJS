import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { OrderItem } from './order-item.model';
import { CartItems } from './cart-items.model';

export enum ProductVariantSize {
    SMALL = '15cm',
    MEDIUM = '20cm',
    LARGE = '30cm',
}

export enum ProductVariantType {
    THIN = 'Mỏng',
    NORMAL = 'Bình thường',
}

@Table
export class ProductVariant extends Model<ProductVariant> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name!: string;

    @Column({ type: DataType.ENUM(...Object.values(ProductVariantSize)), allowNull: false })
    size!: string;

    @Column({ type: DataType.ENUM(...Object.values(ProductVariantType)), allowNull: false })
    type!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    modifiedPrice!: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive!: boolean;

    //relationships
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    productId!: number;

    @BelongsTo(() => Product)
    product!: Product;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];

    @HasMany(() => CartItems)
    cartItems!: CartItems[];
}