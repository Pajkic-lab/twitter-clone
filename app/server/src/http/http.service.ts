import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  private serverLookupTable: { [key: string]: string } = {};

  constructor(private config: ConfigService) {
    const serverLookupTable = {
      development: config.get('BASE_URL_SERVER'),
      test: '/',
      production: '/',
    };
    this.serverLookupTable = serverLookupTable;
  }

  baseUrlServer(sufix: string): void {
    console.log(`${this.serverLookupTable[this.config.get('NODE_ENV')]}${sufix}`);
    // return `${this.serverLookupTable[this.config.get('NODE_ENV')]}${sufix}`;
  }
}