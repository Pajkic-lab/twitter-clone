import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import {
  AuthenticationResponseDto,
  SignInEmailResponseDto,
  SignUpEmailResponseDto,
  UserBase,
} from '@tw/data';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserBase, SignInEmailResponseDto);
      createMap(mapper, UserBase, SignUpEmailResponseDto);
      createMap(mapper, UserBase, AuthenticationResponseDto);
    };
  }
}
