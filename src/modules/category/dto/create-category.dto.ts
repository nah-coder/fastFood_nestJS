import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsString({ message: 'Slug must be a string' })
  slug!: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional() // Optional field
  description?: string;

  @IsOptional()
  @Type(() => Number) // Transform to number
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean({ message: 'Active status must be a boolean' })
  isActive?: boolean;
}
