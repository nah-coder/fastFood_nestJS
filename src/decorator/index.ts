import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  Max,
  Min,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { IsArray } from 'class-validator';

export const StringRequired = (name: string) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is required and must be a string',
      example: 'Example string',
      type: String,
      required: true,
    }),
    IsNotEmpty({ message: `${name} is required` }),
    IsString({ message: `${name} must be a string` }),
  );

export const StringNotRequired = (name: string) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is optional and must be a string',
      example: 'Example string',
      type: String,
      required: false,
    }),
    IsString({ message: `${name} must be a string` }),
    IsOptional(),
  );

export const NumberNotRequired = (name: string) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is optional and must be a number',
      example: 123,
      type: Number,
      required: false,
    }),
    IsNumber({}, { message: `${name} must be a number` }),
    IsOptional(),
  );

export const BooleanNotRequired = (name: string) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is optional and must be a boolean',
      example: true,
      type: Boolean,
      required: false,
    }),
    IsBoolean({ message: `${name} must be a boolean` }),
    IsOptional(),
  );

export const NumberRequired = (name: string, min: number = 0, max?: number) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is required and must be a number',
      example: 123,
      type: Number,
      required: true,
    }),
    Type(() => Number),
    IsNumber({}, { message: `${name} must be a number` }),
    IsNotEmpty({ message: `${name} is required` }),
    Min(min),
    ...(max ? [Max(max)] : []),
  );

export const EnumRequired = (enumType: any, name: string) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is required and must be a valid enum value',
      example: Object.values(enumType)[0],
      required: true,
    }),
    IsNotEmpty({ message: `${name} is required` }),
    IsEnum(enumType, { message: `${name} must be a valid enum value` }),
  );

export const ArrayNotRequired = (name: string, itemType: any) =>
  applyDecorators(
    ApiProperty({
      description: 'This field is optional and must be an array',
      example: [itemType],
      type: [itemType],
      required: false,
    }),
    IsOptional(),
    Type(() => itemType),
    IsArray(),
    ValidateNested({ each: true }),
  );
