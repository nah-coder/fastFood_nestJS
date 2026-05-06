import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryDto } from "./create-category.dto";
import { Type } from "class-transformer";

export class UpdateCategoryDto extends PartialType(CategoryDto) {
    // @IsString({ message: 'Name must be a string' })
    // @IsOptional()
    // name?: string;

    // @IsString({ message: 'Slug must be a string' })
    // @IsOptional()
    // slug?: string;

    // @IsString({ message: 'Description must be a string' })
    // @IsOptional() // Optional field
    // description?: string;

    // @IsOptional()
    // @Type(() => Number) // Transform to number
    // @IsNumber()
    // sortOrder?: number;

    // @IsOptional()
    // @IsBoolean({ message: 'Active status must be a boolean' })
    // isActive?: boolean;
}