import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withActivate<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'activate'> {
  return value => ({
    ...value,
    async activate(): Promise<void> {
      await browsingContext.activate();
    }
  });
}
