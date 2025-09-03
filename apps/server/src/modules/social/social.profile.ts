import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  FollowUserResponseDto,
  FollowerListResponseDto,
  FollowingListResponseDto,
  SocialBase,
  UserWithFollowingStatus,
} from '@tw/data';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';

@Injectable()
export class SocialProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        SocialBase,
        FollowUserResponseDto,
        forMember(
          (destination) => destination.userIdToFollow,
          mapFrom((source) => source.followingId),
        ),
      );
      createMap(mapper, UserWithFollowingStatus, FollowerListResponseDto);
      createMap(mapper, UserWithFollowingStatus, FollowingListResponseDto);
    };
  }
}
