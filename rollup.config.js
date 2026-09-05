import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

import { readFileSync } from 'node:fs'

const { name, version, homepage, main, module, jsdelivr } = JSON.parse(
  readFileSync('./package.json')
)

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : Date.now())).getFullYear()} Jukka Kurkela
 * Released under the MIT License
 */`

const input = 'src/index.js'
const external = ['chart.js', 'chart.js/helpers']
const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers',
}

export default [
  {
    external,
    input,
    output: {
      banner,
      file: module,
      format: 'esm',
      indent: false,
      name,
    },
    plugins: [resolve()],
  },
  {
    external,
    input,
    output: {
      banner,
      file: `dist/${name}.js`,
      format: 'umd',
      globals,
      indent: false,
      name,
    },
    plugins: [resolve()],
  },
  {
    external,
    input,
    output: {
      banner,
      file: main,
      format: 'umd',
      globals,
      indent: false,
      name,
    },
    plugins: [resolve()],
  },
  {
    external,
    input,
    output: {
      file: jsdelivr,
      format: 'umd',
      globals,
      indent: false,
      name,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner,
        },
      }),
    ],
  },
]
