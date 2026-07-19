import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type.ts';

export default function withForward<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'forward'> {
  return value => ({
    ...value,
    async forward(): Promise<void> {
      await browsingContext.forward();
    }
  });
}
