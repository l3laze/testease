'use strict'

const { green, red, reset, yellow } = require('./common.js')

function percentage (dividend, divisor) {
  /* c8 ignore next 3 */
  if (dividend === 0) {
    return 0
  }

  return ((dividend / divisor * 100) + '').substring(0,5)
}

function analyze () {
  let message

  message = `\n${green}pass${reset}    ${this.testsPassed}/${this.testsTotal} ${percentage(this.testsPassed, this.testsTotal)}%`

    message += `\n${yellow}fail${reset}    ${this.testsFailed}/${this.testsTotal} ${percentage(this.testsFailed, this.testsTotal)}%`

    message += `\n${red}error${reset}   ${this.testsError}/${this.testsTotal} ${percentage(this.testsFailed, this.testsTotal)}%`

  console.info(`${message}\n\nFinished in ${(Date.now() - this.timeStarted)}ms`)

  /* c8 ignore next 3 */
  if (this.failures) {
    process.exit(this.testsTotal - this.testsPassed)
  }
}

module.exports = {
  analyze
}
