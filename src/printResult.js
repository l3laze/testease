'use strict'

const { failed, format, passed } = require('./common.js')

function printResult () {
  const keys = Object.keys(this.tests)
  let [ message, i, diff ] = [ '' ]

  for (i = 0; i < keys.length; i++) {
    message = ' '
    diff = this.tests[keys[ i ]].end - this.tests[keys[ i ]].start
    if (this.tests[keys[ i ]].phase === 'describe') {
      message = '\n '
    }

    if (typeof this.tests[keys[ i ]].result !== 'undefined') {
      message += ' '.repeat(3) + (this.tests[keys[ i ]].result === true ? passed : failed) + ' '
    }

    message += `${keys[ i ]} ${format('+%dms', diff)}`
    console.info(message)
  }

  this.tests = {}
}

module.exports = {
  printResult
}
