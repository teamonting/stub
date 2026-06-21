import type { StubDeclaration } from '@onting/rpc';
import type { Stub } from './types';

const stubDeclaration: StubDeclaration<Stub> = {
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
    'type'
  ]
};

export default stubDeclaration;
