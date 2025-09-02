import { Controller } from '@nestjs/common';
import {
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from '@ts-rest/nest';
import { contract } from '@tw/contract';

const c = nestControllerContract(contract);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class ContractTestController implements NestControllerInterface<typeof c> {
  constructor() {}

  @TsRest(c.getPost)
  async getPost(@TsRestRequest() { params: { id } }: RequestShapes['getPost']) {
    const post = {
      id: 'id',
      title: 'title',
      body: 'body',
    };

    return { status: 200 as const, body: post };
  }

  @TsRest(c.createPost)
  async createPost(@TsRestRequest() { body }: RequestShapes['createPost']) {
    const post = {
      id: 'id',
      title: 'title',
      body: 'body',
    };

    return { status: 201 as const, body: post };
  }
}
