import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/mgba.js',
  output: {
    file: 'dist/mgba.bundle.js',
    format: 'iife',
    name: 'mGBA'
  },
  plugins: [nodeResolve()]
};