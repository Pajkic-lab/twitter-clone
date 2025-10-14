import { IsString } from 'class-validator';

export class FollowUserRequestDto {
  @IsString()
  userId: string;
}
