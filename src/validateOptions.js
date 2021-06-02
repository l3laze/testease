'use strict'

/*
 * Where options = {
 *  longName: [
      'l', // shortName
      'Description.',
      default,
      'typeAsTypeofString',
      'limitAsString'
    ]
 * }
 */

function validateOptions (args, options) {
  const longKeys = Object.keys(options)
  const shortMap = {}
  const setOptions = {}

  let longIndex, shortIndex, argText

  for (let k of longKeys) {
    shortMap[options[k][0]] = k
  }

  const shortKeys = Object.keys(shortMap)

  for (let a of args) {
    /* c8 ignore start */
    argText = (a + '').replace(/^[-]{1,2}/, '')
    longIndex = longKeys.indexOf(argText)
    shortIndex = shortKeys.indexOf(argText)

    if (longIndex < 0 && shortIndex < 0) {
      console.info(`${a} is not an option. Options are:\n\n${longKeys.map((o) => '--' + o + '|-' + options[o][0] + ' (' + options[o][2] + '): ' + options[o][1]).join('\n')}\n`)
      process.exit(1)
    } else {
      setOptions[longIndex < 0 ? shortMap[argText] : shortMap[longKeys[argText]]] = true
    }
    /* c8 ignore end */
  }

  for (let o of longKeys) {
    if (typeof setOptions[o] === 'undefined') {
      setOptions[o] = !!+options[o][3]
    }
  }

  // An early console.etc helps lessen runtime, probably by getting it cached for the multiple calls later? May as well print the running options..
  console.error('Options:', setOptions)

  return setOptions
}

module.exports = {
  validateOptions
}
