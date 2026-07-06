interface SnapshotStore {
  getNext(type: 'image/png'): Promise<string | undefined>;
  setCurrent(type: 'image/png', data: string): Promise<void>;
}

export type { SnapshotStore };
