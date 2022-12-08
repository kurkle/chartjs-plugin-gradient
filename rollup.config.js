import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import {readFileSync} from 'fs';

const {name, version, homepage, main} = JSON.parse(readFileSync('./package.json'));

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} Jukka Kurkela
 * Released under the MIT License
 */`;

const input = 'src/index.js';
const external = [
  'chart.js',
  'chart.js/helpers'
];
const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers'
};

export default [
  {
    input,
    plugins: [
      resolve()
    ],
    output: {
      name,
      file: main,
      banner,
      format: 'esm',
      indent: false
    },
    external
  },
  {
    input,
    plugins: [
      resolve()
    ],
    output: {
      name,
      file: main.replace('.esm.js', '.js'),
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    output: {
      name,
      file: main.replace('.esm.js', '.min.js'),
      format: 'umd',
      sourcemap: true,
      indent: false,
      globals
    },
    external
  },
];
