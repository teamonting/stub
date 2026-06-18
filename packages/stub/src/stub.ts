import type { BrowsingContext, StubDeclaration } from '@onting/rpc';

type Stub = {
  captureScreenshot(): Promise<string>;
  getTimestamp(): string;
  setViewport(width: number, height: number, devicePixelRatio?: number | undefined): Promise<void>;
};

const stubDeclaration: StubDeclaration<Stub> = {
  implement({ browsingContext }: { browsingContext: BrowsingContext }) {
    return {
      captureScreenshot(): Promise<string> {
        return browsingContext.captureScreenshot();
      },
      getTimestamp(): string {
        return `Hello, World! ${new Date().toLocaleString()}`;
      },
      async setViewport(width, height, devicePixelRatio) {
        await browsingContext.setViewport(width, height, devicePixelRatio);
      }
    };
  },
  keys: ['captureScreenshot', 'getTimestamp']
};

export default stubDeclaration;
