import { defineImplementation, type StubImplementation } from '@onting/rpc';
import { onErrorResumeNext } from 'on-error-resume-next';
import contract, { type SnapshotStore } from '../index.ts';
import type { Stub } from '../type.ts';
import withActivate from './activate.ts';
import withBack from './back.ts';
import withCaptureBoxScreenshot from './captureBoxScreenshot.ts';
import withCaptureElementScreenshot from './captureElementScreenshot.ts';
import withCaptureScreenshot from './captureScreenshot.ts';
import withClose from './close.ts';
import withClick from './experimental/click.ts';
import withType from './experimental/type.ts';
import withForward from './forward.ts';
import withGetNextSnapshot from './getNextSnapshot.ts';
import withGetVersion from './getVersion.ts';
import withHandleUserPrompt from './handleUserPrompt.ts';
import withInputPerformActions from './inputPerformActions.ts';
import withNavigate from './navigate.ts';
import compose from './private/compose.ts';
import withReload from './reload.ts';
import withSetCurrentSnapshot from './setCurrentSnapshot.ts';
import withSetViewport from './setViewport.ts';
import withTraverseHistory from './traverseHistory.ts';

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
        withActivate(environment),
        withBack(environment),
        withCaptureBoxScreenshot(environment),
        withCaptureElementScreenshot(environment),
        withCaptureScreenshot(environment),
        withClose(environment),
        withForward(environment),
        withGetNextSnapshot(snapshotStore),
        withHandleUserPrompt(environment),
        withInputPerformActions(environment),
        withNavigate(environment),
        withReload(environment),
        withSetCurrentSnapshot(snapshotStore),
        withSetViewport(environment),
        withTraverseHistory(environment),
        withClick(environment),
        withType(environment)
      )({});
    }
  });

export default createStubImplementation;
