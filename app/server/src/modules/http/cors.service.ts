import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class CorsService {
  env: string;
  private corsLookupTable: { [key: string]: string } = {};

  constructor(private confService: ConfigurationService) {
    const env = this.confService.nodeEnvironment;

    const corsLookupTable = {
      development: this.confService.baseUrlClient,
      test: '',
      production: 'http://twitter-clone-j82h.onrender.com',
    };

    this.env = env;
    this.corsLookupTable = corsLookupTable;
  }

  configCors() {
    return `${this.corsLookupTable[this.env]}`;
  }

  configCloudinaryCors() {
    return 'https://cloudinary.com/';
  }
}
