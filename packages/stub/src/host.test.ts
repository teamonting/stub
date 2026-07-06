import { scenario } from '@testduet/given-when-then';
import expect from 'expect';
import * as NodeTest from 'node:test';

scenario(
  'index file',
  bdd => {
    bdd
      .given('nothing', () => {})
      .when('default import is loaded', async () => await import('./host.ts'))
      .then('should return a function', (_, module) => expect(module.default).toBeInstanceOf(Function))
      .when('the function is called', (_, module) =>
        module.default(() => ({
          async getNext() {
            return undefined;
          },
          async setCurrent() {}
        }))
      )
      .then('should have implement() function', (_, stubImplementation) => {
        expect(stubImplementation).toHaveProperty('implement', expect.any(Function));
      })
      .and('should have keys property', (_, stubImplementation) => {
        expect(stubImplementation).toHaveProperty('keys', expect.any(Object));
      })
      .when('implement() is called', (_, stubImplementation) =>
        stubImplementation.implement({
          browsingContext: {
            getTopLevelContexts() {
              return [{ url: 'https://example.com' }];
            }
          },
          webDriver: {}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
      .then('its getTimestamp() function should return a string starting with "Hello, World!"', (_, result) =>
        expect(result.getTimestamp()).toEqual(expect.stringMatching(/^Hello,\sWorld!/u))
      );
  },
  NodeTest
);
