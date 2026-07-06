import type { WebElement } from 'selenium-webdriver';

type NavigateResult = {
  readonly navigationId: number;
  readonly url: string;
};

type ReadinessState = 'complete' | 'interactive' | 'none';

type Stub = {
  getTimestamp(): string;

  activate(): Promise<void>;
  back(): Promise<void>;
  captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
  captureElementScreenshot(sharedId: string, handle?: string | undefined): Promise<string>;
  captureScreenshot(): Promise<string>;
  close(): Promise<void>;
  forward(): Promise<void>;
  handleUserPrompt(accept?: boolean | undefined, userText?: string | undefined): Promise<void>;
  navigate(url: string, readinessState?: ReadinessState | undefined): Promise<NavigateResult>;
  reload(ignoreCache?: boolean, readinessState?: ReadinessState | undefined): Promise<NavigateResult>;
  setViewport(width: number, height: number, devicePixelRatio?: number | undefined): Promise<void>;
  traverseHistory(delta: number): Promise<void>;

  click(
    element: WebElement,
    init?: { button?: number | undefined; x?: number | undefined; y?: number | undefined }
  ): Promise<void>;
  type(text: string): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  test(whatever: any): Promise<void>;

  getNextSnapshot(type: 'image/png'): Promise<string | undefined>;
  setCurrentSnapshot(type: 'image/png', data: string): Promise<void>;
};

export type { NavigateResult, ReadinessState, Stub };
