import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import {
  AuthenticationResponseDto,
  FollowUserResponseDto,
  MostPopularUsersResponseDto,
  NameUniqueUpdateResponseDto,
  PublicUserResponseDto,
  SignInEmailResponseDto,
  SignUpEmailResponseDto,
  SocialBase,
  UpdateUserResponseDto,
  UserBase,
} from '@tw/data';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // user
      createMap(mapper, UserBase, SignInEmailResponseDto);
      createMap(mapper, UserBase, SignUpEmailResponseDto);
      createMap(mapper, UserBase, AuthenticationResponseDto);
      createMap(mapper, UserBase, NameUniqueUpdateResponseDto);
      createMap(mapper, UserBase, UpdateUserResponseDto);
      createMap(mapper, UserBase, PublicUserResponseDto);

      // social
      createMap(
        mapper,
        SocialBase,
        FollowUserResponseDto,
        forMember(
          (destination) => destination.userIdToFollow,
          mapFrom((source) => source.followingId)
        )
      );
    };
  }
}
