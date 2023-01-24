import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor(private config: ConfigService) {}

  baseUrlServer(sufix: string): string {
    return this.config.get('NODE_ENV') == 'production' ? `${sufix}` : `${this.config.get('BASE_URL_SERVER')}${sufix}`;
  }

  baseUrlClient(sufix: string): string {
    return this.config.get('NODE_ENV') == 'production' ? `${sufix}` : `${this.config.get('BASE_URL_CLIENT')}${sufix}`;
  }
}
