import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor(private config: ConfigService) {}
}
