'use strict'

import { bench } from './bench.js'

bench('npm run mocha-test').then((results) => {
  console.log(results)
})
