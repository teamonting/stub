import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type.ts';

export default function withBrowsingContextClose<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextClose'> {
  return value => ({
    ...value,
    async browsingContextClose(): Promise<void> {
      await browsingContext.close();
    }
  });
}
