import { scenario } from '@testduet/given-when-then';
import expect from 'expect';
import * as NodeTest from 'node:test';

scenario(
  'index file',
  bdd => {
    bdd
      .given('nothing', () => {})
      .when('default import is loaded', async () => await import('./index.ts'))
      .then('should have implement() function', (_, module) => {
        expect(module.default).toHaveProperty('implement', expect.any(Function));
      });
  },
  NodeTest
);
