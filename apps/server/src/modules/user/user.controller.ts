import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { IsAuthGuard } from '../auth/is-auth.guard';
import {
  HttpResponse,
  MostPopularUsersResponseDto,
  NameUniqueRequestDto,
  NameUniqueResponseDto,
  NameUniqueUpdateResponseDto,
  PublicUserResponseDto,
  RequestContainingUserId,
  SearchUsersResponseDto,
  SocialStatsResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '@tw/data';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('name-unique')
  //   maybe IsAuthGuard should be moved to shared dir
  @UseGuards(IsAuthGuard)
  handleNameUniqueness(
    @Body() body: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueResponseDto>> {
    return this.userService.checkNameUniqueness(body);
  }

  @Patch('name-unique')
  @UseGuards(IsAuthGuard)
  handleUpdateUserUniqueName(
    @Req() request: RequestContainingUserId,
    @Body() body: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueUpdateResponseDto>> {
    return this.userService.updateUniqueUserName(request.user.id, body);
  }

  @Patch('update')
  @UseGuards(IsAuthGuard)
  handleUpdateUser(
    @Req() request: RequestContainingUserId,
    @Body() body: UpdateUserRequestDto
  ): Promise<HttpResponse<UpdateUserResponseDto>> {
    return this.userService.updateUser(request.user.id, body);
  }

  @Get('public/:id')
  @UsePipes(new ParseIntPipe())
  handleGetPublicUser(
    @Param('id') id: number,
    @Req() request: RequestContainingUserId
  ): Promise<
    HttpResponse<{
      user: PublicUserResponseDto;
      socialStats: SocialStatsResponseDto;
      followingStatus: boolean;
    }>
  > {
    return this.userService.getPublicUser(id, request.user.id);
  }

  @Get('most/popular')
  @UseGuards(IsAuthGuard)
  handleGetMostPopularUsers(
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<MostPopularUsersResponseDto[]>> {
    return this.userService.getMostPopularUsers(request.user.id);
  }

  @Get('search/:searchData')
  handleGetSearchData(
    @Param('searchData') searchData: string,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<SearchUsersResponseDto[]>> {
    return this.userService.getSearchData(searchData, request.user.id);
  }
}
