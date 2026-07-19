import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withCaptureElementScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'captureElementScreenshot'> {
  return value => ({
    ...value,
    async captureElementScreenshot(sharedId: string, handle?: string | undefined): Promise<string> {
      return await browsingContext.captureElementScreenshot(sharedId, handle);
    }
  });
}
