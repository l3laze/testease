'use strict'

const { format, passed, failed, error } = require('./common.js')

function printResult () {
  const keys = Object.keys(this.tests)
  let message, diff

  for (let i = 0; i < keys.length; i++) {
    diff = this.tests[keys[i]].end - this.tests[keys[i]].start

    if (this.tests[keys[i]].phase === 'describe') {
      message = format('\n%s +%dms', keys[i], diff)
    }
    else if (typeof this.tests[keys[i]].result === 'boolean') {
      message = format('%s %s +%dms', (this.tests[keys[i]].result === true ? passed : failed), keys[i], diff)
    }
    else if (typeof this.tests[keys[i]].error !== 'undefined') {
      message = format('%s %s +%dms\n%s', error, keys [i], diff, this.tests[keys[i]].error.stack)
    }

    console.info(message)
  }
}

module.exports = {
  printResult
}
