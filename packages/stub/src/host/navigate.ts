import type { StubEnvironment } from '@onting/rpc';
import type { NavigateResult, ReadinessState, Stub } from '../type.ts';

export default function withNavigate<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'navigate'> {
  return value => ({
    ...value,
    async navigate(url: string, readinessState?: ReadinessState | undefined): Promise<NavigateResult> {
      const result = await browsingContext.navigate(url, readinessState);

      return Object.freeze({ navigationId: result.navigationId, url: result.url });
    }
  });
}
