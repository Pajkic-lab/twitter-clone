import { AutoMap } from '@automapper/classes';

export class FollowUserResponseDto {
  @AutoMap()
  userIdToFollow: string;
}
