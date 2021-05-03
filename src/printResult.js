'use strict'

const { format, passed, failed, error } = require('./common.js')

function printResult () {
  const keys = Object.keys(this.tests)
  let [message, i, diff] = ['']

  for (i = 0; i < keys.length; i++) {
    message = ' '
    diff = this.tests[keys[i]].end - this.tests[keys[i]].start
    if (this.tests[keys[i]].phase === 'describe') {
      message = '\n '
    }

    if (typeof this.tests[keys[i]].result !== 'undefined') {
      message += '   ' + (this.tests[keys[i]].result === true ? passed : failed) + ' '
    } else if (typeof this.tests[keys[i]].error !== 'undefined') {
      message += '   ' + error + ' '
    }

    message += `${keys[i]} ${format('+%dms', diff)}`

    if (typeof this.tests[keys[i]].error !== 'undefined') {
      message += '\n' + this.tests[keys[i]].error.stack
    }

    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
