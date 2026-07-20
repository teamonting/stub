import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type.ts';

export default function withBrowsingContextSetViewport<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextSetViewport'> {
  return value => ({
    ...value,
    async browsingContextSetViewport(
      width: number,
      height: number,
      devicePixelRatio?: number | undefined
    ): Promise<void> {
      await browsingContext.setViewport(width, height, devicePixelRatio);
    }
  });
}
