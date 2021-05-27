'use strict'

const { passed, failed, error, red, reset } = require('./common.js')

/*
function colorErrors (err) {
  const formatted = err.replace(/(at (?:[^(])+)/g, `${red}${'$1'}${reset}`)

  return formatted
}
*/

function printResult () {
  const keys = Object.keys(this.tests)
  let message, diff, i, test

  for (let k of keys) {
    test = this.tests[k]
    diff = test.end - test.start

    if (this.tests[k].phase === 'describe') {
      message = `\n${k} +${diff}ms`
    }
    else if (typeof test.result === 'boolean') {
      message = `${(test.result === true ? passed : failed)} ${k} +${diff}ms`
    }
    else if (typeof test.error !== 'undefined') {
      message = `${error} ${k} +${diff}ms\n${test.error.stack}`
    }

    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
