import { IsNotEmpty, IsString } from 'class-validator';

export class NameUniqueRequestDto {
  @IsNotEmpty()
  @IsString()
  uniqueName: string;
}
