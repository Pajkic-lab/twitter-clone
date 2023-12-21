import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { UtileRepository } from './utile.repository';

@Injectable()
export class UtileService {
  constructor(
    private utileRepository: UtileRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async handleGetUserList() {
    return await this.utileRepository.getUserList();
  }
}
