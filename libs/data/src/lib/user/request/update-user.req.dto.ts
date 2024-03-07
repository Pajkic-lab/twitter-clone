import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  bio?: string | null;

  @IsOptional()
  @IsString()
  location?: string | null;

  @IsOptional()
  @IsString()
  website?: string | null;

  @IsOptional()
  @IsString()
  cover?: string | null;

  @IsOptional()
  @IsString()
  avatar?: string | null;
}
