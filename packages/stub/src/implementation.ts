// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types/selenium-webdriver/bidi/input.d.ts" />

import type { StubImplementation } from '@onting/rpc';
import { WebElement } from 'selenium-webdriver';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import { v7 } from 'uuid';
import stubDeclaration from './index.ts';
import type { NavigateResult, ReadinessState, Stub } from './types.ts';

type ActionSequence = ArrayElement<Parameters<Awaited<ReturnType<typeof getInputInstance>>['perform']>[1]>;
type ArrayElement<T> = T extends Array<infer P> ? P : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Locator = ((await import('selenium-webdriver/bidi/browsingContext.js')).default as any).Locator;

const stubHostImplementation: StubImplementation<Stub> = {
  ...stubDeclaration,
  implement({ browsingContext, webDriver }) {
    return {
      getTimestamp(): string {
        return `Hello, World! ${new Date().toLocaleString()}`;
      },
      async activate(): Promise<void> {
        await browsingContext.activate();
      },
      async back(): Promise<void> {
        await browsingContext.back();
      },
      async captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string> {
        return await browsingContext.captureBoxScreenshot(x, y, width, height);
      },
      async captureElementScreenshot(sharedId: string, handle?: string | undefined): Promise<string> {
        return await browsingContext.captureElementScreenshot(sharedId, handle);
      },
      async captureScreenshot(): Promise<string> {
        return await browsingContext.captureScreenshot();
      },
      async click(
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
      },
      async close(): Promise<void> {
        await browsingContext.close();
      },
      async forward(): Promise<void> {
        await browsingContext.forward();
      },
      async handleUserPrompt(accept?: boolean | undefined, userText?: string | undefined): Promise<void> {
        await browsingContext.handleUserPrompt(accept, userText);
      },
      async navigate(url: string, readinessState?: ReadinessState | undefined): Promise<NavigateResult> {
        const result = await browsingContext.navigate(url, readinessState);

        return Object.freeze({ navigationId: result.navigationId, url: result.url });
      },
      async reload(ignoreCache?: boolean, readinessState?: ReadinessState | undefined): Promise<NavigateResult> {
        const result = await browsingContext.reload(ignoreCache, readinessState);

        return Object.freeze({ navigationId: result.navigationId, url: result.url });
      },
      async setViewport(width: number, height: number, devicePixelRatio?: number | undefined): Promise<void> {
        await browsingContext.setViewport(width, height, devicePixelRatio);
      },
      async traverseHistory(delta: number): Promise<void> {
        await browsingContext.traverseHistory(delta);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async test(whatever: any): Promise<any> {
        console.log({ whatever });

        return await browsingContext.locateElement(Locator.css('[data-testid="click-me"]'));
      },
      async type(text: string, init?: { clickBeforeType?: WebElement | undefined } | undefined): Promise<void> {
        const browsingContextId = browsingContext.id;

        if (!browsingContextId) {
          throw new Error('Invalid browsing context ID');
        }

        const input = await getInputInstance(webDriver);

        await input.init();

        try {
          const sequence: ActionSequence[] = [];

          if (init?.clickBeforeType) {
            sequence.push({
              type: 'pointer',
              id: v7(),
              actions: [
                {
                  origin: { element: { sharedId: await init.clickBeforeType.getId() }, type: 'element' },
                  type: 'pointerMove',
                  x: 0,
                  y: 0
                },
                { button: 0, type: 'pointerDown' },
                { button: 0, type: 'pointerUp' }
              ]
            });
          }

          sequence.push({
            type: 'key',
            id: v7(),
            actions: text.split('').flatMap(character => [
              { type: 'keyDown', value: character },
              { type: 'keyUp', value: character }
            ])
          });

          await input.perform(browsingContextId, sequence);
        } finally {
          await input.release(browsingContextId);
        }
      }
    };
  }
};

export default stubHostImplementation;
