import { IsString } from 'class-validator';

export class UnFollowUserRequestDto {
  @IsString()
  userId: string;
}
