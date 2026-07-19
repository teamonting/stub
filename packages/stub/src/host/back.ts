import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withBack<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'back'> {
  return value => ({
    ...value,
    async back(): Promise<void> {
      await browsingContext.back();
    }
  });
}
