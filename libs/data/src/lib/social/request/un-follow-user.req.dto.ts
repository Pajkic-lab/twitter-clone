import { IsNumber } from 'class-validator';

export class UnFollowUserRequestDto {
  @IsNumber()
  userId: number;
}
