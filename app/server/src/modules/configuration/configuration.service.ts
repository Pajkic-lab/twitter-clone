import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentVariables } from './confTypes';

@Injectable()
export class ConfigurationService {
  constructor(private config: ConfigService<EnvironmentVariables>) {}

  static validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }

  private get(key: keyof EnvironmentVariables): string {
    return this.config.get(key);
  }

  get databaseUrl(): string {
    return this.get('DATABASE_URL_PG');
  }

  get port(): string {
    return this.get('PORT');
  }

  get baseUrlClient(): string {
    return this.get('BASE_URL_CLIENT');
  }

  get baseUrlServer(): string {
    return this.get('BASE_URL_SERVER');
  }

  get nodeEnvironment(): string {
    return this.get('NODE_ENV');
  }

  get googleClientId(): string {
    return this.get('GOOGLE_CLIENT_ID');
  }

  get googleClientSecret(): string {
    return this.get('GOOGLE_CLIENT_SECRET');
  }

  get cloudinaryCloudName(): string {
    return this.get('CLOUDINARY_CLOUD_NAME');
  }

  get cloudinaryApiKey(): string {
    return this.get('CLOUDINARY_API_KEY');
  }

  get cloudinarySecret(): string {
    return this.get('CLOUDINARY_API_SECRET');
  }

  get sessionName(): string {
    return this.get('SESSION_NAME');
  }

  get sessionSecret(): string {
    return this.get('SESSION_SECRET');
  }
}
