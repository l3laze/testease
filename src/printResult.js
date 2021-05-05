'use strict'

const { format, passed, failed, error, red, reset } = require('./common.js')

function colorErrors (err) {
  const formatted = err.replace(/(at (?:[^(])+)/g, format('%s%s%s', red, '$1', reset))

  return formatted
}

function printResult () {
  const keys = Object.keys(this.tests)
  let message, diff, i, test

  for (i = 0; i < keys.length; i++) {
    test = this.tests[keys[i]]
    diff = test.end - test.start

    if (this.tests[keys[i]].phase === 'describe') {
      message = format('\n%s +%dms', keys[i], diff)
    }
    else if (typeof test.result === 'boolean') {
      message = format('%s %s +%dms', (test.result === true ? passed : failed), keys[i], diff)
    }
    else if (typeof test.error !== 'undefined') {
      message = format('%s %s +%dms\n%s', error, keys [i], diff, colorErrors(test.error.stack))
    }

    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
