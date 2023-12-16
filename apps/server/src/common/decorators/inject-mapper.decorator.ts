import { InjectMapper as InjectAutoMapper } from '@automapper/nestjs';

/**
 * Workaround for TS 5.0 until AutoMapper fixes it's implementation
 * This is solution used by NestJS creator to make Nest compatible with 5.0
 *
 * NX keeps updating TS when we run any generate command, so it's easy for 5.0 to sneak up
 * It's better to handle InjectMapper manually, and just replace imports when upstream is updated
 *
 * https://github.com/nestjs/nest/issues/10959
 * https://github.com/nestjs/nest/pull/10970
 */
export function InjectMapper(
  name?: string
): (target: object, key: string | symbol | undefined, index: number) => void {
  return InjectAutoMapper(name) as never;
}
