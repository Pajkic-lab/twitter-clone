import { Controller } from '@nestjs/common';
import { Get, Res, UseGuards } from '@nestjs/common/decorators';
import { UtileService } from './utile.service';
import { IsAuthGuard } from '../auth/is-auth.guard';
import { Response } from 'express';

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
