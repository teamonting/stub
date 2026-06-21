import { defineConfig, type Options } from 'tsup';
import overrideConfig from './tsup.config.override.ts';

const baseConfig: Options = {
  dts: true,
  entry: {
    implementation: './src/implementation.ts',
    index: './src/index.ts'
  },
  sourcemap: true
};

export default defineConfig([
  overrideConfig({
    ...baseConfig,
    format: ['esm'],
    target: 'esnext'
  })
]);
