import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { IsAuthGurard } from 'src/auth/is-auth.guard';
import { UtileService } from './utile.service';
import { Controller } from '@nestjs/common';

@Controller('utile')
export class UtileController {
  constructor(private utileService: UtileService) {}

  @Get('most/popular/users')
  @UseGuards(IsAuthGurard)
  handleGetMostPopularUsers(@Req() request) {
    return this.utileService.getMostPupularUsers(request.user.id);
  }
}
