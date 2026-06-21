import { scenario } from '@testduet/given-when-then';
import { expect } from 'expect';
import * as NodeTest from 'node:test';
import implementation from './implementation.ts';

scenario(
  'stubImplementation',
  bdd => {
    bdd
      .given('a stub implementation', () =>
        implementation.implement(
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
