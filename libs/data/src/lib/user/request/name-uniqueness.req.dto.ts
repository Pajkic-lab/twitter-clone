import { IsNotEmpty, IsString } from 'class-validator';

export class NameUniquenessRequestDto {
  @IsNotEmpty()
  @IsString()
  uniqueName: string;
}
