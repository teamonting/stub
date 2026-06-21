/// <reference path="./types/selenium-webdriver/bidi/input.d.ts" />

import type { StubImplementation } from '@onting/rpc';
import { WebElement } from 'selenium-webdriver';
import getInputInstance from 'selenium-webdriver/bidi/input.js';
import { v7 } from 'uuid';
import stubDeclaration from './index.ts';
import type { NavigateResult, ReadinessState, Stub } from './types.ts';

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
      async click(element: WebElement, button: number = 0): Promise<void> {
        const browsingContextId = browsingContext.id;

        if (!browsingContextId) {
          throw new Error('Invalid browsing context ID');
        }

        const input = await getInputInstance(webDriver);

        await input.init();
        await input.perform(browsingContextId, [
          {
            type: 'pointer',
            id: v7(),
            actions: [
              {
                origin: { element: { sharedId: await element.getId() }, type: 'element' },
                type: 'pointerMove',
                x: 0,
                y: 0
              },
              { button, type: 'pointerDown' },
              { button, type: 'pointerUp' }
            ]
          }
        ]);

        await input.release(browsingContextId);
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
      }
    };
  }
};

export default stubHostImplementation;
