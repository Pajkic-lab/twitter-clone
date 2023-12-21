import { Controller } from '@nestjs/common';
import { Get, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { UtileService } from './utile.service';

@Controller('utile')
export class UtileController {
  constructor(private utileService: UtileService) {}

  @Get('li')
  @UseGuards(IsAuthGuard)
  // exclude passwords!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async handleGetUserList(@Res() response: Response) {
    const res = await this.utileService.handleGetUserList();
    response.json(res);
  }
}
