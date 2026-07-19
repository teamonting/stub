import type { StubEnvironment } from '@onting/rpc';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import { v7 } from 'uuid';
import type { Stub } from '../../type.ts';

type ActionSequence = ArrayElement<Parameters<Awaited<ReturnType<typeof getInputInstance>>['perform']>[1]>;
type ActionItem = ArrayElement<ActionSequence['actions']>;
type ArrayElement<T> = T extends Array<infer P> ? P : never;

export default function withType<T extends object>({
  browsingContext,
  webDriver
}: StubEnvironment): (value: T) => T & Pick<Stub, 'EXPERIMENTAL_type'> {
  return value => ({
    ...value,
    async EXPERIMENTAL_type(
      text: string,
      init?:
        | {
            pause?: number | undefined;
            selectAllBeforeType?: boolean | undefined;
          }
        | undefined
    ): Promise<void> {
      const browsingContextId = browsingContext.id;
      const pause = init?.pause ?? 0;
      const pauseActionItem = { duration: pause, type: 'pause' } as unknown as ActionItem;

      if (!browsingContextId) {
        throw new Error('Invalid browsing context ID');
      }

      const input = await getInputInstance(webDriver);

      await input.init();

      try {
        const actions: ActionItem[] = [];

        // We could not do "clickBeforeType" as it seems there is bug in Chrome 149.
        // After using mouse/pointer to click on the element, the first key press is lost.
        // This is done in the very same `perform()` call.
        // If we can brew the "clickBeforeType" option, we want to keep `perform()` once as it is what devs expect.
        // We tried to add a pause between mouse and keyboard actions, but it does not resolve the issue.
        // It works in Firefox 151 though.

        if (init?.selectAllBeforeType) {
          actions.push(
            // Press-and-hold CTRL key.
            // https://www.w3.org/TR/webdriver/#keyboard-actions
            { type: 'keyDown', value: '\uE009' },
            pauseActionItem,
            { type: 'keyDown', value: 'a' },
            pauseActionItem,
            { type: 'keyUp', value: 'a' },
            pauseActionItem,
            { type: 'keyUp', value: '\uE009' }
          );
        }

        for (const character of text.split('')) {
          actions.push({ type: 'keyDown', value: character }, pauseActionItem, { type: 'keyUp', value: character });
        }

        await input.perform(browsingContextId, [{ actions, id: v7(), type: 'key' }]);
      } finally {
        await input.release(browsingContextId);
      }
    }
  });
}
