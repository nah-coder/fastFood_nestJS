import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}