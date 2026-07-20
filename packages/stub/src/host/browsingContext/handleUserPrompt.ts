import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../../type.ts';

export default function withBrowsingContextHandleUserPrompt<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'browsingContextHandleUserPrompt'> {
  return value => ({
    ...value,
    async browsingContextHandleUserPrompt(accept?: boolean | undefined, userText?: string | undefined): Promise<void> {
      await browsingContext.handleUserPrompt(accept, userText);
    }
  });
}
