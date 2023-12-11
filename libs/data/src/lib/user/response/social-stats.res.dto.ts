import { AutoMap } from '@automapper/classes';

export class SocialStatsResponseDto {
  @AutoMap()
  followingCount: number;

  @AutoMap()
  followersCount: number;
}
