import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class HttpService {
  env: string;

  private serverLookupTable: { [key: string]: string } = {};
  private clientLookupTable: { [key: string]: string } = {};

  constructor(private configurationService: ConfigurationService) {
    const env = this.configurationService.nodeEnvironment;

    const serverLookupTable = {
      development: this.configurationService.baseUrlServer,
      test: '',
      production: '',
    };

    const clientLookupTable = {
      development: this.configurationService.baseUrlClient,
      test: '',
      production: '',
    };

    this.env = env;
    this.serverLookupTable = serverLookupTable;
    this.clientLookupTable = clientLookupTable;
  }

  baseUrlServer(sufix: string) {
    // return `${this.serverLookupTable[this.env]}${sufix}`;
    return `${this.configurationService.baseUrlServer}${sufix}`;
  }

  baseUrlClient(sufix: string) {
    // return `${this.clientLookupTable[this.env]}${sufix}`;
    return `${this.configurationService.baseUrlClient}${sufix}`;
  }
}
