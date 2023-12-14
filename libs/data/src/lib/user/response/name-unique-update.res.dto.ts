import { AutoMap } from '@automapper/classes';

export class NameUniqueUpdateResponseDto {
  @AutoMap()
  uniqueName: string;
}
