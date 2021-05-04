'use strict'

const { format, green, red, reset, yellow } = require('./common.js')

function analyze () {
  let message

  message = format('\n%spass%s    %d/%d %i%', green, reset, this.testsPassed, this.testsTotal, this.testsPassed !== 0 ? (this.testsPassed / this.testsTotal * 100) : 0)

    message += format('\n%sfail%s    %d/%d %i%', yellow, reset, this.testsFailed, this.testsTotal,  this.testsFailed !== 0 ? (this.testsPassed / this.testsTotal * 100) : 0)

    message += format('\n%serror%s   %d/%d %i%', red, reset, this.testsError, this.testsTotal, this.testsError !== 0 ? (this.testsPassed / this.testsTotal * 100) : 0)

  console.info(message + '\n')

  if (this.exitWithFailNum) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
