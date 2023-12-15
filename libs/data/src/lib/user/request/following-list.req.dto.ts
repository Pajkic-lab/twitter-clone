import { IsNumber } from 'class-validator';

export class FollowingListRequestDto {
  @IsNumber()
  followingOffset: number;

  @IsNumber()
  followingLimit: number;
}
