import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class HttpService {
  env: string;

  private serverLookupTable: { [key: string]: string } = {};
  private clientLookupTable: { [key: string]: string } = {};

  constructor(private confService: ConfigurationService) {
    const env = this.confService.nodeEnvironment;

    const serverLookupTable = {
      development: this.confService.baseUrlServer,
      test: '',
      production: '',
    };

    const clientLookupTable = {
      development: this.confService.baseUrlClient,
      test: '',
      production: '',
    };

    this.env = env;
    this.serverLookupTable = serverLookupTable;
    this.clientLookupTable = clientLookupTable;
  }

  baseUrlServer(sufix: string) {
    return `${this.serverLookupTable[this.env]}${sufix}`;
  }

  baseUrlClient(sufix: string) {
    return `${this.clientLookupTable[this.env]}${sufix}`;
  }
}
