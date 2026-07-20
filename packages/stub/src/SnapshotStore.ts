interface SnapshotStore {
  getNext(type: 'image/png'): Promise<ArrayBuffer | undefined>;
  setCurrent(type: 'image/png', data: ArrayBuffer): Promise<void>;
}

export type { SnapshotStore };
