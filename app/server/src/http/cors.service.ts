import { Injectable } from '@nestjs/common';
import { ConfService } from 'src/modules/conf/conf.service';

@Injectable()
export class CorsService {
  env: string;
  private corsLookupTable: { [key: string]: string } = {};

  constructor(private confService: ConfService) {
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
