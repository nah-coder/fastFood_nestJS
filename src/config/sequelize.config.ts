import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/lib/sequelize';
import { Address, Cart, Category, Coupon, OrderItem, Product, Review, UserCoupon } from 'src/models';
import { CartItemsIngredient } from 'src/models/cart-item-ingredient.model';
import { CartItems } from 'src/models/cart-items.model';
import { Ingredient } from 'src/models/ingredient.model';
import { OrderItemIngredient } from 'src/models/order-item-ingredient.model';
import { Order } from 'src/models/order.model';
import { ProductIngredient } from 'src/models/product-ingredient.model';
import { ProductVariant } from 'src/models/product-varriant.model';
import { User } from 'src/models/user.model';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT')
    ? Number(configService.get<number>('DB_PORT'))
    : 5432,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  models: [
    User,
    Category,
    Product,
    Cart,
    Ingredient,
    OrderItem,
    Order,
    OrderItemIngredient,
    ProductVariant,
    ProductIngredient,
    Address,
    CartItems,
    CartItemsIngredient,
    Coupon,
    UserCoupon,
    Review,
  ], // Add your models here
});
