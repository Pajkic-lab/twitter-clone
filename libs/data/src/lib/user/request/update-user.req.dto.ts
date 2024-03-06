import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsString()
  name: string | undefined;

  @IsOptional()
  @IsString()
  bio: string | undefined;

  @IsOptional()
  @IsString()
  location: string | undefined;

  @IsOptional()
  @IsString()
  website: string | undefined;

  @IsOptional()
  @IsString()
  cover: string | undefined;

  @IsOptional()
  @IsString()
  avatar: string | undefined;
}
