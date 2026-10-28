import type { BrowsingContext } from '@onting/rpc';
import expect from 'expect';
import test, { type Mock } from 'node:test';
import type { WebDriver } from 'selenium-webdriver';
import type GetInputInstanceType from 'selenium-webdriver/bidi/input.js';

type Input = Awaited<ReturnType<typeof GetInputInstanceType>>;

test('hold and relese SHIFT key', async () => {
  test.mock.module('selenium-webdriver/bidi/input.js', {
    exports: {
      default: test.mock.fn(function getInputInstance() {
        return Promise.resolve({
          init: test.mock.fn(() => Promise.resolve()),
          perform: test.mock.fn(() => Promise.resolve()),
          release: test.mock.fn(() => Promise.resolve())
        });
      })
    }
  });

  const getInputInstance = (await import('selenium-webdriver/bidi/input.js')).default as Mock<
    (typeof import('selenium-webdriver/bidi/input.js'))['default']
  >;
  const { default: withType } = await import('./type.ts');
  const browsingContext = { id: 'b-00001' } as BrowsingContext;
  const webDriver = {} as WebDriver;

  const stub = withType({ browsingContext, webDriver })({});

  // +SHIFT, a, -SHIFT
  await stub.EXPERIMENTAL_type('\uF000\uE008a\uF001\uE008');

  const input = (await getInputInstance.mock.calls[0]?.result!) as unknown as {
    init: Mock<Input['init']>;
    perform: Mock<Input['perform']>;
    release: Mock<Input['release']>;
  };

  expect(input.init.mock.calls.length).toBe(1);
  expect(input.perform.mock.calls.length).toBe(1);
  expect(input.perform.mock.calls[0]?.arguments[1]).toEqual([
    {
      actions: [
        { type: 'keyDown', value: '\uE008' },
        { duration: 0, type: 'pause' },
        { type: 'keyDown', value: 'a' },
        { duration: 0, type: 'pause' },
        { type: 'keyUp', value: 'a' },
        { duration: 0, type: 'pause' },
        { type: 'keyUp', value: '\uE008' },
        { duration: 0, type: 'pause' }
      ],
      id: expect.any(String),
      type: 'key'
    }
  ]);
  expect(input.release.mock.calls.length).toBe(1);
});
