import { IsNumber, IsString } from 'class-validator';

export class PublicProfileFollowerListRequestDto {
  @IsString()
  userId: string;

  @IsNumber()
  PPfollowerOffset: number;

  @IsNumber()
  PPfollowerLimit: number;
}
