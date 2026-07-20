import { defineImplementation, type StubImplementation } from '@onting/rpc';
import { onErrorResumeNext } from 'on-error-resume-next';
import contract, { type SnapshotStore } from '../index.ts';
import type { Stub } from '../type.ts';
import withBrowsingContextActivate from './browsingContext/activate.ts';
import withBrowsingContextCaptureBoxScreenshot from './browsingContext/captureBoxScreenshot.ts';
import withBrowsingContextCaptureElementScreenshot from './browsingContext/captureElementScreenshot.ts';
import withBrowsingContextCaptureScreenshot from './browsingContext/captureScreenshot.ts';
import withBrowsingContextClose from './browsingContext/close.ts';
import withBrowsingContextHandleUserPrompt from './browsingContext/handleUserPrompt.ts';
import withBrowsingContextNavigate from './browsingContext/navigate.ts';
import withBrowsingContextReload from './browsingContext/reload.ts';
import withBrowsingContextSetViewport from './browsingContext/setViewport.ts';
import withBrowsingContextTraverseHistory from './browsingContext/traverseHistory.ts';
import withClick from './experimental/click.ts';
import withType from './experimental/type.ts';
import withGetNextSnapshot from './getNextSnapshot.ts';
import withGetVersion from './getVersion.ts';
import withInputPerformActions from './inputPerformActions.ts';
import compose from './private/compose.ts';
import withSetCurrentSnapshot from './setCurrentSnapshot.ts';

const createStubImplementation = async (
  getSnapshotStore: (url: URL) => SnapshotStore
): Promise<StubImplementation<Stub>> =>
  defineImplementation(contract, {
    async implement(environment) {
      const urlString = (await environment.browsingContext.getTopLevelContexts()).find(context => context.url)?.url;
      const url = onErrorResumeNext<() => URL | undefined, URL | undefined>((): URL | undefined =>
        typeof urlString === 'string' ? new URL(urlString) : undefined
      );

      if (typeof url === 'undefined') {
        throw new Error(`Invalid URL for the current browsing context: "${urlString}"`);
      }

      const snapshotStore = getSnapshotStore(url);

      return compose(
        withGetVersion(environment),
        withBrowsingContextActivate(environment),
        withBrowsingContextCaptureBoxScreenshot(environment),
        withBrowsingContextCaptureElementScreenshot(environment),
        withBrowsingContextCaptureScreenshot(environment),
        withBrowsingContextClose(environment),
        withBrowsingContextHandleUserPrompt(environment),
        withBrowsingContextNavigate(environment),
        withBrowsingContextReload(environment),
        withBrowsingContextSetViewport(environment),
        withBrowsingContextTraverseHistory(environment),
        withGetNextSnapshot(snapshotStore),
        withInputPerformActions(environment),
        withSetCurrentSnapshot(snapshotStore),
        withClick(environment),
        withType(environment)
      )({});
    }
  });

export default createStubImplementation;
