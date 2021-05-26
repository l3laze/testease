'use strict'

const { format } = require('./common.js')

/* Builds a JSON map of the describe/it blocks, like:
{
  DescribeLabel: [
    { label: 'ItLabel', phase: 'it' }
  ],
  AnotherDescribeLabel: [
    { label: 'ItLabelAlso', phase: 'it' }
  ]
}
*/

function testMap (file) {
  const tmap = {}
  const pstack = [] // Phase stack
  let label, phase, re, line

  // Get all describe/it blocks
  const tmp = file.match(/((describe|it)\s*\((.|\s?!(\\n))+)|(\s*\}\s*\))/g)

  for (let i = 0; i < tmp.length; i++) {
    line = tmp[i]

    if (/\}\s*\)/.test(line)) {
      // Current block is finished
      pstack.pop()
    } else {
      // Find the next block
      re = line.match(/(describe|it)\s*\(/)

      if (re !== null) {
        phase = re[1]
      }

      /* c8 ignore next 3*/
      if (re === null) {
        throw new Error(format('Couldn\'t find phase (describe, it) of line %d:\n%s', i, line))
      }

      // Find the next label
      re = line.match(/['"](\w|\s|\d|-|_|\(|\))+['"]/)

      if (re !== null) {
        // Remove surrounding quotes from labels
        label = re[0].replace(/(^['"])|(['"]$)/g, '')
      }

      /* c8 ignore next 3 */
      if (re === null) {
        throw new Error(format('Couldn\'t find label of line %d:\n%s', i, line))
      }

      // Add current it block and label to stack
      pstack.push({
        label,
        phase
      })

      if (typeof tmap[pstack[0].label] === 'undefined') {
        // Describe block
        tmap[pstack[0].label] = []
      } else {
        // It block
        tmap[pstack[0].label].push({
          label,
          phase
        })
      }
    }
  }

  // console.info('tmap', tmap)

  return tmap
}

module.exports = {
  testMap
}
