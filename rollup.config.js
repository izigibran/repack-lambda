import buble from 'rollup-plugin-buble';
import ramda from 'rollup-plugin-ramda';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies);

export default {
  entry: `./src/lambdas/${ process.env.APP }`,
  plugins: [
    buble(),
    ramda(),
    nodeResolve(),
    commonjs()
  ],
  external: external,
  targets: [
    {
      dest: `./dest/lambdas/${ process.env.APP }/index.js`,
      format: 'cjs',
      sourceMap: true
    }
  ]
};
