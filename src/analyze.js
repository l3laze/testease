'use strict'

const { format, green, red, reset, yellow } = require('./common.js')

function analyze () {
  const time = Date.now() - this.timeStarted
  const message = (this.testsPassed === this.testsTotal)
    ? format('\n  %s%d/%d passed%s (%dms)', green, this.testsPassed, this.testsTotal, reset, time)
    : format('\n%s! %s%d/%d passed%s (%dms)', yellow, red, this.testsTotal - this.testsPassed, this.testsTotal, reset, time)

  console.info(message + '\n')

  if (this.exitWithFailNum) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
