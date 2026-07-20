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
    'browsingContextCaptureBoxScreenshot',
    'browsingContextCaptureElementScreenshot',
    'browsingContextCaptureScreenshot',
    'browsingContextClose',
    'browsingContextHandleUserPrompt',
    'browsingContextNavigate',
    'browsingContextReload',
    'browsingContextSetViewport',
    'browsingContextTraverseHistory',
    'getNextSnapshot',
    'setCurrentSnapshot'
  ]
});

export default stubDeclaration;
export type { SnapshotStore } from './SnapshotStore.ts';
export type { Stub };
