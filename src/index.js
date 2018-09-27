'use strict'

const debug = require('ebug')('testease')

debug('Initialing testease')

// Internal properties
const options = []
const { readFileSync } = require('fs')
const { resolve: pathResolve } = require('path')
const { format } = require('./common.js')

let [ tests, timeStarted, testsPassed, testsTotal, blockFinished, mapOfTests, mapKeys ] = [ {}, false, 0, 0, false ]

module.exports = function init (...args) {
  const { analyze } = require('./analyze.js')
  const { printResult } = require('./printResult.js')
  const { testMap } = require('./testMap.js')

  const module = {
    tests,
    timeStarted,
    testsPassed,
    testsTotal,
    blockFinished,
    mapOfTests,
    mapKeys
  }

  module.args = args
  options.concat(args)

  const startInit = Date.now()
  process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
  })

  if (!module.mapOfTests) {
    module.mapOfTests = testMap('' + readFileSync(pathResolve(process.argv[ 1 ])))
    module.mapKeys = Object.keys(module.mapOfTests)
  }

  // Bind the private module methods..
  const analyzeResults = analyze.bind(module)
  const printAResult = printResult.bind(module)

  module.it = async function it (lab, fn) {
    module.tests[ lab ] = {
      start: Date.now(),
      phase: 'it'
    }

    let result

    try {
      if (fn.constructor.name === 'AsyncFunction') {
        result = await fn()
      } else {
        result = fn()
      }
    } catch (err) {
      throw err
    }

    module.tests[ lab ].end = Date.now()
    module.tests[ lab ].result = !!+result

    if (result) {
      module.testsPassed++
    }

    module.testsTotal++

    try {
      const keys = Object.keys(module.tests)

      let parentMap = keys.indexOf(lab)

      parentMap = module.mapOfTests[keys[ 0 ]]
        ? module.mapOfTests[keys[ 0 ]]
        : null

      if (parentMap === null) {
        throw new Error(format('%s does not exist', keys[ 0 ]))
      }

      if (parentMap[ parentMap.length - 1 ].label === lab) {
        module.blockFinished = true
      }
    } catch (err) {
      throw err
    }
  }

  module.describe = async function describe (label, func) {
    if (!module.timeStarted) {
      module.timeStarted = Date.now()
    }

    module.tests[ label ] = {
      start: Date.now(),
      phase: 'describe'
    }

    try {
      if (func.constructor.name === 'AsyncFunction') {
        await func()
      } else {
        func()
      }
    } catch (err) {
      throw err
    }

    module.tests[ label ].end = Date.now()
    printAResult()

    if (module.blockFinished && module.mapKeys.indexOf(label) === (module.mapKeys.length - 1)) {
      analyzeResults()
    }
  }

  debug('Dropped testease in %dms', Date.now() - startInit)

  return module
}
