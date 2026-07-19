import { defineContract } from '@onting/rpc';
import type { Stub } from './type.ts';

const stubDeclaration = defineContract<Stub>({
  keys: [
    // Almost ready
    'getVersion',
    'inputPerformActions',

    // Improving
    'EXPERIMENTAL_click',
    'EXPERIMENTAL_type',

    // Need review
    'activate',
    'back',
    'captureBoxScreenshot',
    'captureElementScreenshot',
    'captureScreenshot',
    'close',
    'forward',
    'getNextSnapshot',
    'handleUserPrompt',
    'navigate',
    'reload',
    'setCurrentSnapshot',
    'setViewport',
    'traverseHistory'
  ]
});

export default stubDeclaration;
export type { SnapshotStore } from './SnapshotStore.ts';
export type { Stub };
