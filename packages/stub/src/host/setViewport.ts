import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type.ts';

export default function withSetViewport<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'setViewport'> {
  return value => ({
    ...value,
    async setViewport(width: number, height: number, devicePixelRatio?: number | undefined): Promise<void> {
      await browsingContext.setViewport(width, height, devicePixelRatio);
    }
  });
}
