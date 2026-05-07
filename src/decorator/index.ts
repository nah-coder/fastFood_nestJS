import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export const StringRequired = (name: string) => applyDecorators(
  ApiProperty({ description: 'This field is required and must be a string', example: 'Example string', type: String, required: true }),
  IsNotEmpty({ message: `${name} is required` }),
  IsString({ message: `${name} must be a string` }),
);

export const StringNotRequired = (name: string) => applyDecorators(
  ApiProperty({ description: 'This field is optional and must be a string', example: 'Example string', type: String, required: false }),
  IsString({ message: `${name} must be a string` }),
  IsOptional(),
);

export const NumberNotRequired = (name: string) => applyDecorators(
  ApiProperty({ description: 'This field is optional and must be a number', example: 123, type: Number, required: false }),
  IsNumber({}, { message: `${name} must be a number` }),
  IsOptional(),
);

export const BooleanNotRequired = (name: string) => applyDecorators(
  ApiProperty({ description: 'This field is optional and must be a boolean', example: true, type: Boolean, required: false }),
  IsBoolean({ message: `${name} must be a boolean` }),
  IsOptional(),
);