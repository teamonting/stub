import type { StubEnvironment } from '@onting/rpc';
import type { WebElement } from 'selenium-webdriver';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import { v7 } from 'uuid';
import type { Stub } from '../../type';

export default function withClick<T extends object>({
  browsingContext,
  webDriver
}: StubEnvironment): (value: T) => T & Pick<Stub, 'EXPERIMENTAL_click'> {
  return value => ({
    ...value,
    async EXPERIMENTAL_click(
      element: WebElement,
      init?: {
        button?: number | undefined;
        pointerType?: 'mouse' | 'pen' | 'touch';
        x?: number | undefined;
        y: number | undefined;
      }
    ): Promise<void> {
      const browsingContextId = browsingContext.id;

      if (!browsingContextId) {
        throw new Error('Invalid browsing context ID');
      }

      const input = await getInputInstance(webDriver);

      await input.init();

      try {
        await input.perform(browsingContextId, [
          {
            type: 'pointer',
            id: v7(),
            parameters: {
              pointerType: init?.pointerType ?? 'mouse'
            },
            actions: [
              {
                origin: { element: { sharedId: await element.getId() }, type: 'element' },
                type: 'pointerMove',
                x: init?.x ?? 0,
                y: init?.y ?? 0
              },
              { button: init?.button ?? 0, type: 'pointerDown' },
              { button: init?.button ?? 0, type: 'pointerUp' }
            ]
          }
        ]);
      } finally {
        await input.release(browsingContextId);
      }
    }
  });
}
