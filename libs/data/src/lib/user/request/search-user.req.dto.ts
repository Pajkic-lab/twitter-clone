import { IsString } from 'class-validator';

export class SearchUserRequestDto {
  @IsString()
  searchData: string;
}
