import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  env: string;
  private serverLookupTable: { [key: string]: string } = {};
  private clientLookupTable: { [key: string]: string } = {};

  constructor(private config: ConfigService) {
    const env = config.get('NODE_ENV');

    const serverLookupTable = {
      development: config.get('BASE_URL_SERVER'),
      test: '',
      production: '',
    };

    const clientLookupTable = {
      development: config.get('BASE_URL_CLIENT'),
      test: '',
      production: '',
    };

    this.env = env;
    this.serverLookupTable = serverLookupTable;
    this.clientLookupTable = clientLookupTable;
  }

  baseUrlServer(sufix: string): string {
    return `${this.serverLookupTable[this.env]}${sufix}`;
  }

  baseUrlClient(sufix: string): string {
    return `${this.clientLookupTable[this.env]}${sufix}`;
  }
}
