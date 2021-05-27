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

  for (i = 0; i < keys.length; i++) {
    test = this.tests[keys[i]]
    diff = test.end - test.start

    if (this.tests[keys[i]].phase === 'describe') {
      message = `\n${keys[i]} +${diff}ms`
    }
    else if (typeof test.result === 'boolean') {
      message = `${(test.result === true ? passed : failed)} ${keys[i]} +${diff}ms`
    }
    else if (typeof test.error !== 'undefined') {
      message = `${error} ${keys[i]} +${diff}ms\n${test.error.stack}`
    }

    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
