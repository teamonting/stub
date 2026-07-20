import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type.ts';

export default function withBrowsingContextTraverseHistory<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextTraverseHistory'> {
  return value => ({
    ...value,
    async browsingContextTraverseHistory(delta: number): Promise<void> {
      await browsingContext.traverseHistory(delta);
    }
  });
}
