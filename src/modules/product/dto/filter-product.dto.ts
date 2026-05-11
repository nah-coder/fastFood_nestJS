import {
  BooleanNotRequired,
  NumberNotRequired,
  StringNotRequired,
} from 'src/decorator';

export class FilterProductDto {
  @StringNotRequired('search')
  search?: string;

  @BooleanNotRequired('isActive')
  isActive?: boolean;

  @BooleanNotRequired('isFeatured')
  isFeatured?: boolean;

  @NumberNotRequired('categoryId')
  categoryId?: number;

  @NumberNotRequired('page')
  page!: number;

  @NumberNotRequired('limit')
  limit!: number;

  @StringNotRequired('softBy')
  softBy?: string;

  @StringNotRequired('sortOrder')
  sortOrder?: string;

  @NumberNotRequired('minPrice')
  minPrice?: number;

  @NumberNotRequired('maxPrice')
  maxPrice?: number;
}
