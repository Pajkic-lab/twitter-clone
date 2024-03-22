import { IsNumber } from 'class-validator';

export class PublicProfileFollowerListRequestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  PPfollowerOffset: number;

  @IsNumber()
  PPfollowerLimit: number;
}
