import { IsNumber } from 'class-validator';

export class FollowUserRequestDto {
  @IsNumber()
  userId: number;
}
