import { defineConfig, type Options } from 'tsup';
import overrideConfig from './tsup.config.override.ts';

const baseConfig: Options = {
  dts: true,
  entry: {
    host: './src/host.ts',
    index: './src/index.ts'
  },
  noExternal: ['@onting/rpc'],
  sourcemap: true
};

export default defineConfig([
  overrideConfig({
    ...baseConfig,
    format: ['esm'],
    target: 'esnext'
  })
]);
