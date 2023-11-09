import { Controller } from '@nestjs/common';
import { Get, Param, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { UtileService } from './utile.service';
import { IsAuthGuard } from '../auth/is-auth.guard';
import { Request, Response } from 'express';

@Controller('utile')
export class UtileController {
  constructor(private utileService: UtileService) {}

  @Get('li')
  @UseGuards(IsAuthGuard)
  async handleGetUserList(@Res() response: Response) {
    const res = await this.utileService.handleGetUserList();
    response.json(res);
  }

  @Get('most/popular/users')
  @UseGuards(IsAuthGuard)
  handleGetMostPopularUsers(@Req() request) {
    return this.utileService.getMostPupularUsers(request.user.id);
  }

  @Get('search/:searchData')
  handleGetSearchData(@Param('searchData') searchData: string, @Req() request) {
    return this.utileService.getSearchData(searchData, request?.user?.id);
  }

  @Get('followers/:offset/:limit')
  @UseGuards(IsAuthGuard)
  handleGetFollowers(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request
  ) {
    return this.utileService.handleFollowers(request.user.id, offset, limit);
  }

  @Get('following/:offset/:limit')
  @UseGuards(IsAuthGuard)
  handleGetFollowing(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
    @Req() request
  ) {
    return this.utileService.handleFollowing(request.user.id, offset, limit);
  }

  @Get('pp/followers/:userId/:offset/:limit')
  handleGetPPFollowers(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number
  ) {
    return this.utileService.handleFollowers(userId, offset, limit);
  }

  @Get('pp/following/:userId/:offset/:limit')
  handleGetPPFollowing(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number
  ) {
    return this.utileService.handleFollowing(userId, offset, limit);
  }
}
