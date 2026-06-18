import { scenario } from '@testduet/given-when-then';
import { expect } from 'expect';
import * as NodeTest from 'node:test';
import stubDeclaration from './stub.ts';

scenario(
  'stubDeclaration',
  bdd => {
    bdd
      .given('a stub implementation', () =>
        stubDeclaration.implement(
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
