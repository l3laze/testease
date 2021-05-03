'use strict'

process.on('uncaughtException', (err) => {
  console.error('\nThere was an uncaught exception:\n' + err.stack + '\n')
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('\nThere was an uncaught rejection:\n' + err.stack + '\n')
  process.exit(1)
})

module.exports = function init (args) {
  const { readFileSync } = require('fs')
  const { resolve: pathResolve } = require('path')
  const { format } = require('./common.js')
  const { analyze } = require('./analyze.js')
  const { printResult } = require('./printResult.js')
  const { testMap } = require('./testMap.js')

  const mod = {
    exitWithFailNum: typeof args !== 'undefined' && typeof args.exitWithFailNum !== 'undefined' ? args.exitWithFailNum : true,
    tests: {},
    timeStarted: 0,
    testsPassed: 0,
    testsError: 0,
    testsTotal: 0,
    blockFinished: false,
    mapOfTests: null,
    mapKeys: null
  }

  const analyzeResults = analyze.bind(mod)
  const printAResult = printResult.bind(mod)

  mod.it = async function it (lab, fn) {
    mod.tests[lab] = {
      start: Date.now(),
      phase: 'it'
    }

    let result
    let error

    try {
      if (fn.constructor.name === 'AsyncFunction') {
        result = await fn()
      } else {
        result = fn()
      }
    } catch (err) {
      error = err
    }

    mod.tests[lab].end = Date.now()

    if (typeof result !== 'undefined') {
      mod.testsPassed++
      mod.tests[lab].result = !!+result
    } else if (error) {
      mod.testsError++
      mod.tests[lab].error = error
    }

    mod.testsTotal++

    const keys = Object.keys(mod.tests)

    let parentMap = keys.indexOf(lab)

    // console.info(lab, parentMap, keys)

    parentMap = mod.mapOfTests[keys[0]]
      ? mod.mapOfTests[keys[0]]
      : null

    if (parentMap === null) {
      throw new Error(format('%s does not exist', keys[0]))
    }

    if (parentMap[parentMap.length - 1].label === lab) {
      mod.blockFinished = true
    }
  }

  mod.describe = async function describe (label, func) {
    if (!mod.timeStarted) {
      mod.timeStarted = Date.now()
    }

    if (!mod.mapOfTests) {
      mod.mapOfTests = testMap('' + readFileSync(pathResolve(process.argv[1])))
      mod.mapKeys = Object.keys(mod.mapOfTests)
    }

    mod.tests[label] = {
      start: Date.now(),
      phase: 'describe'
    }

    if (func.constructor.name === 'AsyncFunction') {
      await func()
    } else {
      func()
    }

    mod.tests[label].end = Date.now()
    printAResult()

    if (mod.blockFinished && mod.mapKeys.indexOf(label) === (mod.mapKeys.length - 1)) {
      analyzeResults()
    }
  }

  return mod
}
