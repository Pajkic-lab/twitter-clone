import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Request } from 'express';

class UserProperties {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export type ReqUserContaining = Request & {
  user: UserProperties;
};

export class CreatableUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreatableGoogleUser {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
