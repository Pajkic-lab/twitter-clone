import { Mapper, MappingProfile, createMap, mapFrom } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import {
  FollowerListResponseDto,
  MostPopularUsersResponseDto,
  SearchUsersResponseDto,
  UserBase,
  UserWithFollowingStatus,
} from '@tw/data';

@Injectable()
export class UtileProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserBase, MostPopularUsersResponseDto);
      createMap(mapper, UserBase, SearchUsersResponseDto);
      createMap(mapper, UserBase, FollowerListResponseDto);
      createMap(mapper, UserWithFollowingStatus, FollowerListResponseDto);
    };
  }
}
