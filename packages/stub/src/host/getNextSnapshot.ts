import type { SnapshotStore } from '../index.ts';
import type { Stub } from '../type.ts';

export default function withGetNextSnapshot<T extends object>(
  snapshotStore: SnapshotStore
): (value: T) => T & Pick<Stub, 'getNextSnapshot'> {
  return value => ({
    ...value,
    async getNextSnapshot(type) {
      const buffer = await snapshotStore.getNext(type);

      return buffer && Buffer.from(buffer).toString('base64');
    }
  });
}
