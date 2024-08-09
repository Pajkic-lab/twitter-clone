import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  test() {
    console.log('test helper service');
  }
}
