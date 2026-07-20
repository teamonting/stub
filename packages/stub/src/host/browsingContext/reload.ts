import type { StubEnvironment } from '@onting/rpc';
import type { NavigateResult, ReadinessState, Stub } from '../../type.ts';

export default function withBrowsingContextReload<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextReload'> {
  return value => ({
    ...value,
    async browsingContextReload(
      ignoreCache?: boolean,
      readinessState?: ReadinessState | undefined
    ): Promise<NavigateResult> {
      const result = await browsingContext.reload(ignoreCache, readinessState);

      return Object.freeze({ navigationId: result.navigationId, url: result.url });
    }
  });
}
