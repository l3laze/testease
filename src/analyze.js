'use strict'

const { format, green, red, reset, yellow } = require('./common.js')

function percentage (dividend, divisor) {
  /* c8 ignore next 3 */
  if (dividend === 0) {
    return 0
  }

  return (dividend / divisor * 100)
}

function analyze () {
  let message

  message = format('\n%spass%s    %d/%d %i%', green, reset, this.testsPassed, this.testsTotal, percentage(this.testsPassed, this.testsTotal))

    message += format('\n%sfail%s    %d/%d %i%', yellow, reset, this.testsFailed, this.testsTotal,  percentage(this.testsFailed, this.testsTotal))

    message += format('\n%serror%s   %d/%d %i%', red, reset, this.testsError, this.testsTotal, percentage(this.testsError, this.testsTotal))

  console.info(`${message}\n\nFinished in ${(Date.now() - this.timeStarted)}ms`)

  /* c8 ignore next 3 */
  if (this.exitWithFailNum) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
