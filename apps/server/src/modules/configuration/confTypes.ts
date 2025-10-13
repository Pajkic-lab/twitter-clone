import { IsNotEmpty } from 'class-validator';

export class EnvironmentVariables {
  /* PORT */
  @IsNotEmpty()
  PORT: string;

  /* URL */
  @IsNotEmpty()
  BASE_URL_CLIENT: string;

  @IsNotEmpty()
  BASE_URL_SERVER: string;

  /* Database */
  @IsNotEmpty()
  DATABASE_URL_PG: string;

  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNotEmpty()
  POSTGRES_PORT: string;

  @IsNotEmpty()
  POSTGRES_DBNAME: string;

  /* ENVIRONMENT */
  @IsNotEmpty()
  // @IsIn(['development', 'staging', 'production'])
  NODE_ENV: string;

  @IsNotEmpty()
  NODE_VERSION: string;

  /* GOOGLE */
  @IsNotEmpty()
  GOOGLE_CLIENT_ID: string;

  @IsNotEmpty()
  GOOGLE_CLIENT_SECRET: string;

  /* CLOUDINARY */
  @IsNotEmpty()
  CLOUDINARY_CLOUD_NAME: string;

  @IsNotEmpty()
  CLOUDINARY_API_KEY: string;

  @IsNotEmpty()
  CLOUDINARY_API_SECRET: string;

  /* SESSION */
  @IsNotEmpty()
  SESSION_NAME: string;

  @IsNotEmpty()
  SESSION_SECRET: string;
}
