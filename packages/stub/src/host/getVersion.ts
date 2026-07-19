import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withGetVersion<T extends object>(_: StubEnvironment): (value: T) => Pick<Stub, 'getVersion'> {
  return value => ({
    ...value,
    getVersion() {
      return PACKAGE_VERSION;
    }
  });
}
