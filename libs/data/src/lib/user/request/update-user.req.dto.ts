import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  @Length(3, 8)
  name?: string | null;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  bio?: string | null;

  @IsOptional()
  @IsString()
  @Length(2, 15)
  location?: string | null;

  @IsOptional()
  @IsString()
  @Length(4, 25)
  website?: string | null;

  @IsOptional()
  @IsString()
  cover?: string | null;

  @IsOptional()
  @IsString()
  avatar?: string | null;
}
