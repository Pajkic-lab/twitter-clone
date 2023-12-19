import { Injectable } from '@nestjs/common';
import { UtileRepository } from './utile.repository';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { Mapper } from '@automapper/core';

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
