import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class CorsService {
  env: string;
  private corsLookupTable: { [key: string]: string } = {};

  constructor(private configurationService: ConfigurationService) {
    const env = this.configurationService.nodeEnvironment;

    const corsLookupTable = {
      development: this.configurationService.baseUrlClient,
      test: '',
      production: 'http://twitter-clone-j82h.onrender.com',
    };

    this.env = env;
    this.corsLookupTable = corsLookupTable;
  }

  configCors() {
    // return `${this.corsLookupTable[this.env]}`;
    return `${this.configurationService.baseUrlClient}`;
  }

  configCloudinaryCors() {
    return 'https://cloudinary.com/';
  }
}
