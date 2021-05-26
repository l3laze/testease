'use strict'

const { format } = require('./common.js')
const { getNestedProp, setNestedProp } = require('./nestedProp.js')

/* Builds a JSON map of the describe/it blocks, like:
[
  DescribeLabel: {
    { label: 'ItLabel', phase: 'it' }
  },
  AnotherDescribeLabel: {
    { label: 'ItLabelAlso', phase: 'it' }
  }
]
*/

function testMapAsObj (file) {
  const tmap = {}
  const parentStack = new Array()
  let label, token, line, phase

  const tmp = file.match(/((describe|it)\s*\((.|\s?!(\\n))+)|(\s*\}\s*\))/g)

  for (let i = 0; i < tmp.length; i++) {
    line = tmp[i]

    if (/\}\s*\)/.test(line)) {
      parentStack.pop()
    } else {
      token = line.match(/(describe|it)\s*\(/)

      if (token !== null) {
        phase = token[1]
      } else {
        throw new Error(format('Couldn\'t find phase (describe, it) of line %d:\n%s', i, line))
      }

      token = line.match(/['"](\w|\s|\d|-|_|\(|\))+['"]/)

      if (token !== null) {
        label = token[0].replace(/(^['"])|(['"]$)/g, '')
      } else {
        throw new Error(format('Couldn\'t find label of line %d:\n%s', i, line))
      }

      parentStack.push(label)
      setNestedProp(tmap, parentStack, { phase })
    }
  }

  // console.info('after', tmap)

  return tmap
}

module.exports = {
  testMapAsObj
}
