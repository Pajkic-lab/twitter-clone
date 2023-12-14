import { IsNumber } from 'class-validator';

export class FollowerListRequestDto {
  @IsNumber()
  followerOffset: number;

  @IsNumber()
  followerLimit: number;
}
