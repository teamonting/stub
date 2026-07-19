import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type.ts';

export default function withTraverseHistory<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'traverseHistory'> {
  return value => ({
    ...value,
    async traverseHistory(delta: number): Promise<void> {
      await browsingContext.traverseHistory(delta);
    }
  });
}
