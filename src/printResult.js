'use strict'

const { format, passed, failed, error, red, reset } = require('./common.js')

function colorErrors (err) {
  const formatted = err.replace(/(at (?:[^(])+)/g, format('%s%s%s', red, '$1', reset))

  return formatted
}

function printResult () {
  const keys = Object.keys(this.tests)
  let message, diff, i

  for (i = 0; i < keys.length; i++) {
    diff = this.tests[keys[i]].end - this.tests[keys[i]].start

    // console.info(i, keys[i], keys)

    if (this.tests[keys[i]].phase === 'describe') {
      message = format('\n%s +%dms', keys[i], diff)
    }
    else if (typeof this.tests[keys[i]].result === 'boolean') {
      message = format('%s %s +%dms', (this.tests[keys[i]].result === true ? passed : failed), keys[i], diff)
    }
    else if (typeof this.tests[keys[i]].error !== 'undefined') {
      message = format('%s %s +%dms\n%s', error, keys [i], diff, colorErrors(this.tests[keys[i]].error.stack))
    }

    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
