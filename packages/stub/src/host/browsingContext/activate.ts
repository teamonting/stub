import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type';

export default function withBrowsingContextActivate<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextActivate'> {
  return value => ({
    ...value,
    async browsingContextActivate(): Promise<void> {
      await browsingContext.activate();
    }
  });
}
