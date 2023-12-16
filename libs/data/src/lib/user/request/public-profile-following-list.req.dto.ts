import { IsNumber } from 'class-validator';

export class PublicProfileFollowingListRequestDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  PPfollowingOffset: number;

  @IsNumber()
  PPfollowingLimit: number;
}
