import type { StubEnvironment } from '@onting/rpc';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import type { Stub } from '../type.ts';

type ActionSequence = ArrayElement<Parameters<Awaited<ReturnType<typeof getInputInstance>>['perform']>[1]>;
type ArrayElement<T> = T extends Array<infer P> ? P : never;

export default function withInputPerformActions<T extends object>({
  browsingContext,
  webDriver
}: StubEnvironment): (value: T) => T & Pick<Stub, 'inputPerformActions'> {
  return value => ({
    ...value,
    async inputPerformActions(actions: readonly ActionSequence[], noAutoRelease?: boolean | undefined): Promise<void> {
      const browsingContextId = browsingContext.id;

      if (!browsingContextId) {
        throw new Error('Invalid browsing context ID');
      }

      const input = await getInputInstance(webDriver);

      await input.init();
      await input.perform(browsingContextId, [...actions]);
      noAutoRelease || (await input.release(browsingContextId));
    }
  });
}
