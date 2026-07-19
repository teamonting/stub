import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withCaptureScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'captureScreenshot'> {
  return value => ({
    ...value,
    async captureScreenshot(): Promise<string> {
      return await browsingContext.captureScreenshot();
    }
  });
}
