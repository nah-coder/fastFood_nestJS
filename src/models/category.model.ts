import { BeforeUpdate, BeforeValidate, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { Helper } from 'src/utils/helpers';

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

    @BeforeValidate
    static makeSlug(newCategory: Category) {
        const name = newCategory.dataValues.name;

        if (newCategory.isNewRecord && name) {
            const slug = Helper.makeSlugFromString(name);
            newCategory.setDataValue('slug', slug);
        }
    }

    @BeforeUpdate
    static updateSlug(updatedCategory: Category) {
        const name = updatedCategory.dataValues.name;

        if (updatedCategory.changed('name')) {
            const name = updatedCategory.dataValues.name;
            const slug = Helper.makeSlugFromString(name);
            updatedCategory.setDataValue('slug', slug);
        }
    }
}