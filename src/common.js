'use strict'

const { format } = require('util')
const [green, yellow, red, reset] = ['\u001B[32m', '\u001B[33m', '\u001B[31m', '\u001B[0m']

// Green check mark
const passed = format('%s%s %s', green, '\u2713', reset)

// Yellow exclamation point
const failed = format('%s%s %s', yellow, '!', reset)

// Red skull & crossbones
const error = format('%s%s %s', red, '\u2620', reset)

module.exports = {
  format,
  red,
  green,
  yellow,
  reset,
  passed,
  failed,
  error
}
