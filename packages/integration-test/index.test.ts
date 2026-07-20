import createStubImplementation from '@onting/stub/host.js';
import { scenario } from '@testduet/given-when-then';
import { expect } from 'expect';
import * as NodeTest from 'node:test';

scenario(
  'createStubImplementation',
  bdd => {
    bdd
      .given('a stub implementation', async () =>
        (
          await createStubImplementation(() => ({
            async getNext() {
              return undefined;
            },
            async setCurrent() {}
          }))
        ).implement({
          browsingContext: {
            getTopLevelContexts() {
              return [{ url: 'https://example.com' }];
            }
          },
          webDriver: {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
      .when('getVersion is called', precondition => precondition.getVersion())
      .then('should return a semver string', (_, result) =>
        expect(result).toEqual(expect.stringMatching(/^\d+\.\d+\.\d+(-|$)/u))
      );
  },
  NodeTest
);
