import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/worker.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: ['@wa-hub/wa-engine', '@wa-hub/database'],
  external: ['playwright', 'playwright-core'],
});
