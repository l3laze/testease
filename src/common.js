'use strict'

const { format } = require('util')
const [ red, green, yellow, reset ] = [ '\u001B[31m', '\u001B[32m', '\u001B[33m', '\u001B[0m' ]
const passed = format('%s%s %s', green, '\u2713', reset) // Green check mark
const failed = format('%s%s %s', red, '\u2620', reset) // Red skull & crossbones

module.exports = {
  format,
  red,
  green,
  yellow,
  reset,
  passed,
  failed
}
