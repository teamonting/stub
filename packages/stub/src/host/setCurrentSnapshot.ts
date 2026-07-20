import type { SnapshotStore } from '../index.ts';
import type { Stub } from '../type.ts';

export default function withSetCurrentSnapshot<T extends object>(
  snapshotStore: SnapshotStore
): (value: T) => T & Pick<Stub, 'setCurrentSnapshot'> {
  return value => ({
    ...value,
    async setCurrentSnapshot(type, data) {
      await snapshotStore.setCurrent(type, Buffer.from(data, 'base64').buffer);
    }
  });
}
