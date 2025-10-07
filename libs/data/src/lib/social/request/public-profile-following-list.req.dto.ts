import { IsNumber, IsString } from 'class-validator';

export class PublicProfileFollowingListRequestDto {
  @IsString()
  userId: string;

  @IsNumber()
  PPfollowingOffset: number;

  @IsNumber()
  PPfollowingLimit: number;
}
