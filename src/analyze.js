'use strict'

const { format, green, red, reset, yellow } = require('./common.js')

function analyze () {
  const message = (this.testsPassed === this.testsTotal)
    ? format('\n  %s%d/%d passed%s (%dms)', green, this.testsPassed, this.testsTotal, reset)
    : format('\n %s%d/%d passed%s (%dms)\n %s%d/%d errors%s', yellow, this.testsTotal - this.testsPassed, this.testsTotal, reset, (Date.now() - this.timeStarted), red, this.testsError, this.testsTotal, reset)

  console.info(message + '\n')

  if (this.exitWithFailNum) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
