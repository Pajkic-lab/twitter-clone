import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  MostPopularUsersResponseDto,
  NameUniqueUpdateResponseDto,
  PublicUserResponseDto,
  SearchUsersResponseDto,
  UpdateUserResponseDto,
  UserBase,
  UserResponseDto,
} from '@tw/data';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserBase, NameUniqueUpdateResponseDto);
      createMap(mapper, UserBase, UpdateUserResponseDto);
      createMap(mapper, UserBase, PublicUserResponseDto);
      createMap(mapper, UserBase, MostPopularUsersResponseDto);
      createMap(mapper, UserBase, SearchUsersResponseDto);
      createMap(mapper, UserBase, UserResponseDto);
    };
  }
}
