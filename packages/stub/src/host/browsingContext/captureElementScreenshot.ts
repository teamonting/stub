import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type';

export default function withBrowsingContextCaptureElementScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextCaptureElementScreenshot'> {
  return value => ({
    ...value,
    async browsingContextCaptureElementScreenshot(sharedId: string, handle?: string | undefined): Promise<string> {
      return await browsingContext.captureElementScreenshot(sharedId, handle);
    }
  });
}
