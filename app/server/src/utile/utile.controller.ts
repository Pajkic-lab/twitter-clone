import { Get, Param, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { IsAuthGurard } from 'src/auth/is-auth.guard';
import { UtileService } from './utile.service';
import { Controller } from '@nestjs/common';

@Controller('utile')
export class UtileController {
  constructor(private utileService: UtileService) {}

  @Get('li')
  @UseGuards(IsAuthGurard)
  async handleGetUserList(@Res() response) {
    const res = await this.utileService.handleGetUserList();
    response.json(res);
  }

  @Get('most/popular/users')
  @UseGuards(IsAuthGurard)
  handleGetMostPopularUsers(@Req() request) {
    return this.utileService.getMostPupularUsers(request.user.id);
  }

  @Get('search/:searchData')
  handleGetSearchData(@Param('searchData') searchData: string, @Req() request) {
    return this.utileService.getSearchData(searchData, request?.user?.id);
  }

  @Get('followers/:offset/:limit')
  @UseGuards(IsAuthGurard)
  handleGetFollowers(@Param('offset') offset: number, @Param('limit') limit: number, @Req() request) {
    return this.utileService.handleFollowers(request.user.id, offset, limit);
  }

  @Get('following/:offset/:limit')
  @UseGuards(IsAuthGurard)
  handleGetFollowing(@Param('offset') offset: number, @Param('limit') limit: number, @Req() request) {
    return this.utileService.handleFollowing(request.user.id, offset, limit);
  }

  @Get('pp/followers/:userId/:offset/:limit')
  handleGetPPFollowers(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ) {
    return this.utileService.handleFollowers(userId, offset, limit);
  }

  @Get('pp/following/:userId/:offset/:limit')
  handleGetPPFollowing(
    @Param('userId') userId: number,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ) {
    return this.utileService.handleFollowing(userId, offset, limit);
  }
}
