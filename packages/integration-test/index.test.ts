import createStubImplementation from '@onting/stub/host.js';
import { scenario } from '@testduet/given-when-then';
import { expect } from 'expect';
import * as NodeTest from 'node:test';

scenario(
  'createStubImplementation',
  bdd => {
    bdd
      .given('a stub implementation', () =>
        createStubImplementation(() => ({
          async getNext() {
            return undefined;
          },
          async setCurrent() {}
        })).implement(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {} as any
        )
      )
      .when('getTimestamp is called', precondition => precondition.getTimestamp())
      .then('should return a string starting with "Hello, World!"', (_, result) =>
        expect(result).toEqual(expect.stringMatching(/^Hello,\sWorld!/u))
      );
  },
  NodeTest
);
