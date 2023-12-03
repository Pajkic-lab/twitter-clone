import { IsBoolean } from 'class-validator';

export class NameUniquenessResponseDto {
  @IsBoolean()
  isNameUnique: boolean;
}
