import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class CorsService {
  constructor(private configurationService: ConfigurationService) {}

  configCors() {
    return `${this.configurationService.baseUrlClient}`;
  }
}
