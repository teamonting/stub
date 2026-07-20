import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type';

export default function withBrowsingContextCaptureScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextCaptureScreenshot'> {
  return value => ({
    ...value,
    async browsingContextCaptureScreenshot(): Promise<string> {
      return await browsingContext.captureScreenshot();
    }
  });
}
