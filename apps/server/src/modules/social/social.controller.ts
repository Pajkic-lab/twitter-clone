import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  FollowUserRequestDto,
  FollowUserResponseDto,
  FollowerListResponseDto,
  FollowingListResponseDto,
  HttpResponse,
  RequestContainingUserId,
  SocialStatsResponseDto,
  UnFollowUserResponseDto,
} from '@tw/data';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @Get('stats')
  @UseGuards(IsAuthGuard)
  handleGetSocialStats(
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<SocialStatsResponseDto>> {
    return this.socialService.getStats(request.user.id);
  }

  @Get('stats/public-user/:userId')
  @UseGuards(IsAuthGuard)
  handleGetPublicUserSocialStats(
    @Param('userId') userId: number
  ): Promise<HttpResponse<SocialStatsResponseDto>> {
    return this.socialService.getPublicUserSocialStats(userId);
  }

  @Get('following-status/public-user/:userId')
  @UseGuards(IsAuthGuard)
  handleGetPublicUserFollowingStatus(
    @Req() request: RequestContainingUserId,
    @Param('userId') userId: number
  ) {
    return this.socialService.getPublicUserFollowingStatus(
      request.user.id,
      userId
    );
  }

  @Post('follow/user')
  @UseGuards(IsAuthGuard)
  handleFollowUser(
    @Req() request: RequestContainingUserId,
    @Body() body: FollowUserRequestDto
  ): Promise<HttpResponse<FollowUserResponseDto>> {
    return this.socialService.followUser(request.user.id, body);
  }

  @Delete('un-follow/user/:userIdToUnFollow')
  @UseGuards(IsAuthGuard)
  @UsePipes(new ParseIntPipe())
  handleUnFollowUser(
    @Param('userIdToUnFollow') userIdToUnFollow: number,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<UnFollowUserResponseDto>> {
    return this.socialService.unFollowUser(request.user.id, userIdToUnFollow);
  }

  @Get('followers/:offset/:limit')
  @UseGuards(IsAuthGuard)
  handleGetFollowers(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    return this.socialService.handleFollowers(request.user.id, offset, limit);
  }

  @Get('following/:offset/:limit')
  @UseGuards(IsAuthGuard)
  handleGetFollowing(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    return this.socialService.handleFollowing(request.user.id, offset, limit);
  }

  @Get('public-profile/followers/:userId/:offset/:limit')
  handleGetPublicProfileFollowers(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    return this.socialService.handlePublicProfileFollowers(
      request.user.id,
      userId,
      offset,
      limit
    );
  }

  @Get('public-profile/following/:userId/:offset/:limit')
  handleGetPublicProfileFollowing(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    return this.socialService.handlePublicProfileFollowing(
      request.user.id,
      userId,
      offset,
      limit
    );
  }
}
