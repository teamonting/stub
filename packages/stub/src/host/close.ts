import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type.ts';

export default function withClose<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'close'> {
  return value => ({
    ...value,
    async close(): Promise<void> {
      await browsingContext.close();
    }
  });
}
