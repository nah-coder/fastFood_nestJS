import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';

@Table
export class Category extends Model<Category> {
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    slug!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    sortOrder!: number;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    isActive!: boolean;

    //relationships
    @HasMany(() => Product)
    products!: Product[];
}