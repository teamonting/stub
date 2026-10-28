interface SnapshotStore {
  getNext(type: 'image/png'): Promise<Uint8Array | undefined>;
  setCurrent(type: 'image/png', data: Uint8Array): Promise<void>;
}

export type { SnapshotStore };
