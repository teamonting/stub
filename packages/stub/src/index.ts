import { defineContract } from '@onting/rpc';
import type { Stub } from './type.ts';

const stubDeclaration = defineContract<Stub>({
  keys: [
    'activate',
    'back',
    'captureBoxScreenshot',
    'captureElementScreenshot',
    'captureScreenshot',
    'click',
    'close',
    'forward',
    'getTimestamp',
    'handleUserPrompt',
    'navigate',
    'reload',
    'setViewport',
    'traverseHistory',
    'test',
    'type',
    'getNextSnapshot',
    'setCurrentSnapshot'
  ]
});

export default stubDeclaration;
export type { SnapshotStore } from './SnapshotStore.ts';
export type { Stub };
