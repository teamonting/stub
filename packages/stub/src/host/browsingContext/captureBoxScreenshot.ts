import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type';

export default function withBrowsingContextCaptureBoxScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextCaptureBoxScreenshot'> {
  return value => ({
    ...value,
    async browsingContextCaptureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string> {
      return await browsingContext.captureBoxScreenshot(x, y, width, height);
    }
  });
}
