import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CorsService {
  env: string;
  private corsLookupTable: { [key: string]: string } = {};

  constructor(private config: ConfigService) {
    const env = config.get('NODE_ENV');

    const corsLookupTable = {
      development: config.get('BASE_URL_CLIENT'),
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
