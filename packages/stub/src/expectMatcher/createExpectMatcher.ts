import type { Stub } from '../type.ts';
import createToMatchImageSnapshot, { type ImageSnapshotMatcher } from './private/createToMatchImageSnapshot.ts';

export default function createExpectMatcher(stub: Stub): { readonly toMatchImageSnapshot: ImageSnapshotMatcher } {
  return Object.freeze({ toMatchImageSnapshot: createToMatchImageSnapshot(stub) });
}
