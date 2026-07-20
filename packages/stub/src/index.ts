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
    'browsingContextActivate',
    'browsingContextClose',
    'browsingContextNavigate',
    'browsingContextReload',
    'browsingContextTraverseHistory',
    'captureBoxScreenshot',
    'captureElementScreenshot',
    'captureScreenshot',
    'getNextSnapshot',
    'handleUserPrompt',
    'setCurrentSnapshot',
    'setViewport'
  ]
});

export default stubDeclaration;
export type { SnapshotStore } from './SnapshotStore.ts';
export type { Stub };
