import type { SnapshotStore } from '../index.ts';
import type { Stub } from '../type.ts';

export default function withGetNextSnapshot<T extends object>(
  snapshotStore: SnapshotStore
): (value: T) => T & Pick<Stub, 'getNextSnapshot'> {
  return value => ({
    ...value,
    async getNextSnapshot(type) {
      return snapshotStore.getNext(type);
    }
  });
}
