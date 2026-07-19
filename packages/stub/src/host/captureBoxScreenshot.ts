import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type';

export default function withCaptureBoxScreenshot<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'captureBoxScreenshot'> {
  return value => ({
    ...value,
    async captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string> {
      return await browsingContext.captureBoxScreenshot(x, y, width, height);
    }
  });
}
