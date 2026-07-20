import type { WebElement } from 'selenium-webdriver';
import type getInputInstance from 'selenium-webdriver/bidi/input.js';

type ActionSequence = ArrayElement<Parameters<Awaited<ReturnType<typeof getInputInstance>>['perform']>[1]>;
type ArrayElement<T> = T extends Array<infer P> ? P : never;

type NavigateResult = {
  readonly navigationId: number;
  readonly url: string;
};

type ReadinessState = 'complete' | 'interactive' | 'none';

type Stub = {
  // #region Almost ready
  getNextSnapshot(type: 'image/png'): Promise<string | undefined>;
  getVersion(): string;
  inputPerformActions(actions: readonly ActionSequence[], noAutoRelease?: boolean | undefined): Promise<void>;
  setCurrentSnapshot(type: 'image/png', data: string): Promise<void>;
  // #endregion

  // #region Reviewing
  EXPERIMENTAL_click(
    element: WebElement,
    init?: { button?: number | undefined; x?: number | undefined; y?: number | undefined }
  ): Promise<void>;
  EXPERIMENTAL_type(text: string): Promise<void>;
  // #endregion

  // #region Need review
  browsingContextActivate(): Promise<void>;
  browsingContextCaptureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
  browsingContextCaptureElementScreenshot(sharedId: string, handle?: string | undefined): Promise<string>;
  browsingContextCaptureScreenshot(): Promise<string>;
  browsingContextClose(): Promise<void>;
  browsingContextHandleUserPrompt(accept?: boolean | undefined, userText?: string | undefined): Promise<void>;
  browsingContextNavigate(url: string, readinessState?: ReadinessState | undefined): Promise<NavigateResult>;
  browsingContextReload(ignoreCache?: boolean, readinessState?: ReadinessState | undefined): Promise<NavigateResult>;
  browsingContextSetViewport(width: number, height: number, devicePixelRatio?: number | undefined): Promise<void>;
  browsingContextTraverseHistory(delta: number): Promise<void>;
  // #endregion
};

export type { NavigateResult, ReadinessState, Stub };
