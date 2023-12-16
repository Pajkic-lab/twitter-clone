import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  cover: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
