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
  UnFollowUserResponseDto,
} from '@tw/data';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

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
    @Param('limit') limit: number
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    return this.socialService.handleFollowers(userId, offset, limit);
  }

  @Get('public-profile/following/:userId/:offset/:limit')
  handleGetPublicProfileFollowing(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    return this.socialService.handleFollowing(userId, offset, limit);
  }
}