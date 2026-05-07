import { Type } from 'class-transformer';
import { BooleanNotRequired, NumberNotRequired, StringNotRequired, StringRequired } from 'src/decorator';

export class CategoryDto {
  @StringRequired('Name')
  name!: string;

  @StringNotRequired('Description')
  description?: string;

  @NumberNotRequired('Sort Order')
  @Type(() => Number) // Chuyển đổi giá trị sang kiểu number
  sortOrder?: number;

  @BooleanNotRequired('Is Active')
  isActive?: boolean;
}
