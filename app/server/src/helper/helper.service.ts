import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor() {
    // console.log('test render helper service');
  }

  test() {
    console.log('test helper service');
  }
}
