'use strict'

const { format } = require('./common.js')

function testMap (file) {
  const tmap = {}
  const pstack = []
  let [ label, phase, re ] = []
  const tmp = file.match(/((describe|it)\s*\((.|\s?!(\\n))+)|(\s*\}\))/g)
  tmp.forEach((line) => {
    if (/\}\)/.test(line)) {
      pstack.pop()
    } else {
      re = line.match(/(describe|it)\s*\(/)
      if (re !== null) {
        phase = re[ 1 ]
      } else {
        throw new Error(format('Couldn\'t find phase (describe, it) of line:\n%s', line))
      }

      re = line.match(/['"](\w|\s|\d|-|_|\(|\))+['"]/)
      if (re !== null) {
        label = re[ 0 ].replace(/(^['"])|(['"]$)/g, '')
      } else {
        throw new Error(format('Couldn\'t find label of line:\n%s', line))
      }

      pstack.push({
        label,
        phase
      })

      if (typeof tmap[ pstack[ 0 ].label ] === 'undefined') {
        tmap[ pstack[ 0 ].label ] = []
      } else {
        tmap[ pstack[ 0 ].label ].push({
          label,
          phase
        })
      }
    }
  })

  return tmap
}

module.exports = {
  testMap
}
