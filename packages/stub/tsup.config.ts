import { defineConfig, type Options } from 'tsup';
import overrideConfig from './tsup.config.override.ts';

declare global {
  const process: { env?: { npm_package_version?: string | undefined } | undefined } | undefined;
}

const baseConfig: Options = {
  define: {
    PACKAGE_VERSION: JSON.stringify(process?.env?.npm_package_version || '0.0.0-0')
  },
  dts: true,
  entry: {
    expectMatcher: './src/expectMatcher.ts',
    host: './src/host.ts',
    index: './src/index.ts'
  },
  noExternal: ['@onting/rpc', 'base64-arraybuffer', 'on-error-resume-next', 'pixelmatch', 'pngjs'],
  sourcemap: true
};

export default defineConfig([
  overrideConfig({
    ...baseConfig,
    format: ['esm'],
    target: 'esnext'
  })
]);
