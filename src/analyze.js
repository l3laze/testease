'use strict'

const { format, green, red, reset, yellow } = require('./common.js')

function percentage (dividend, divisor) {
  return dividend !== 0 ? (dividend / divisor * 100) : 0
}

function analyze () {
  let message

  message = format('\n%spass%s    %d/%d %i%', green, reset, this.testsPassed, this.testsTotal, percentage(this.testsPassed, this.testsTotal))

    message += format('\n%sfail%s    %d/%d %i%', yellow, reset, this.testsFailed, this.testsTotal,  percentage(this.testsFailed, this.testsTotal))

    message += format('\n%serror%s   %d/%d %i%', red, reset, this.testsError, this.testsTotal, percentage(this.testsError, this.testsTotal))

  console.info(message + '\n')

  if (this.exitWithFailNum) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
