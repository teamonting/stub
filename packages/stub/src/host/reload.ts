import type { StubEnvironment } from '@onting/rpc';
import type { NavigateResult, ReadinessState, Stub } from '../type.ts';

export default function withReload<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'reload'> {
  return value => ({
    ...value,
    async reload(ignoreCache?: boolean, readinessState?: ReadinessState | undefined): Promise<NavigateResult> {
      const result = await browsingContext.reload(ignoreCache, readinessState);

      return Object.freeze({ navigationId: result.navigationId, url: result.url });
    }
  });
}
