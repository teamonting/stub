// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./types/selenium-webdriver/bidi/input.d.ts" />

import { defineImplementation } from '@onting/rpc';
import { WebElement } from 'selenium-webdriver';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import { v7 } from 'uuid';
import contract, { type SnapshotStore } from './index.ts';
import type { NavigateResult, ReadinessState } from './type.ts';
import { onErrorResumeNext } from 'on-error-resume-next';

type ActionSequence = ArrayElement<Parameters<Awaited<ReturnType<typeof getInputInstance>>['perform']>[1]>;
type ActionItem = ArrayElement<ActionSequence['actions']>;
type ArrayElement<T> = T extends Array<infer P> ? P : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Locator = ((await import('selenium-webdriver/bidi/browsingContext.js')).default as any).Locator;

const createStubImplementation = (getSnapshotStore: (url: URL) => SnapshotStore) =>
  defineImplementation(contract, {
    async implement({ browsingContext, webDriver }) {
      const urlString = (await browsingContext.getTopLevelContexts()).find(context => context.url)?.url;
      const url = onErrorResumeNext<() => URL | undefined, URL | undefined>((): URL | undefined =>
        typeof urlString === 'string' ? new URL(urlString) : undefined
      );

      if (typeof url === 'undefined') {
        throw new Error(`Invalid URL for the current browsing context: "${urlString}"`);
      }

      const snapshotStore = getSnapshotStore(url);

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
        async type(
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
        },

        async getNextSnapshot(type) {
          return snapshotStore.getNext(type);
        },
        async setCurrentSnapshot(type, data) {
          await snapshotStore.setCurrent(type, data);
        }
      };
    }
  });

export default createStubImplementation;
