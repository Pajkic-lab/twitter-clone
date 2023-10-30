import { IsIn, IsNotEmpty } from 'class-validator';

export class EnvironmentVariables {
  /* PORT */
  @IsNotEmpty()
  SERVER_PORT: string;

  /* URL */
  @IsNotEmpty()
  BASE_URL_CLIENT: string;

  @IsNotEmpty()
  BASE_URL_SERVER: string;

  /* Database */
  @IsNotEmpty()
  DATABASE_URL_PG: string;

  /* ENVIRONMENT */
  @IsNotEmpty()
  @IsIn(['development', 'staging', 'production'])
  NODE_ENV: string;

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
