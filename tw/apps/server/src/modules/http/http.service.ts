import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class HttpService {
  constructor(private configurationService: ConfigurationService) {}

  baseUrlServer(sufix: string) {
    return `${this.configurationService.baseUrlServer}${sufix}`;
  }

  baseUrlClient(sufix: string) {
    return `${this.configurationService.baseUrlClient}${sufix}`;
  }
}
