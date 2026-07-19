import type { StubEnvironment } from '@onting/rpc';
import type { Stub } from '../type.ts';

export default function withHandleUserPrompt<T extends object>({
  browsingContext
}: StubEnvironment): (value: T) => T & Pick<Stub, 'handleUserPrompt'> {
  return value => ({
    ...value,
    async handleUserPrompt(accept?: boolean | undefined, userText?: string | undefined): Promise<void> {
      await browsingContext.handleUserPrompt(accept, userText);
    }
  });
}
