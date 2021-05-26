'use strict'

const { readFileSync } = require('fs')
const { resolve: pathResolve } = require('path')
const { format } = require('./common.js')
const { analyze } = require('./analyze.js')
const { printResult } = require('./printResult.js')
const { testMap } = require('./testMap.js')
const { testMapAsObj } = require('./testMapAsObj.js')

function init (args) {
  /* c8 ignore next 4 */
  process.on('uncaughtException', (err) => {
    console.error('\nThere was an uncaught exception:\n' + err.stack + '\n')
    process.exit(1)
  })

  /* c8 ignore next 4 */
  process.on('unhandledRejection', (err) => {
    console.error('\nThere was an uncaught rejection:\n' + err.stack + '\n')
    process.exit(1)
  })

  const mod = {
    /* c8 ignore next */
    [ ...args ],
    tests: {},
    timeStarted: 0,
    testsPassed: 0,
    testsFailed: 0,
    testsError: 0,
    testsTotal: 0,
    blockFinished: false,
    mapOfTests: null,
    mapKeys: null
  }

  const analyzeResults = analyze.bind(mod)
  const printAResult = printResult.bind(mod)

  mod.it = async function it (lab, fn) {
    this.tests[ lab ] = {
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

    this.tests[ lab ].end = Date.now()

    if (typeof result !== 'undefined') {
      this.tests[ lab ].result = !!+result

      if (mod.tests[ lab ].result === true) {
        this.testsPassed++
      } else {
        this.testsFailed++
      }
    } else if (error) {
      this.testsError++
      this.tests[ lab ].error = error
    }

    this.testsTotal++

    const keys = Object.keys(mod.tests)

    let parentMap = keys.indexOf(lab)

    parentMap = this.mapOfTests[keys[ 0 ]]
      ? this.mapOfTests[keys[ 0 ]]
      /* c8 ignore next */ : null

    // No nested it blocks.
    /* c8 ignore next 4 */
    if (parentMap === null) {
      throw new Error(format('%s does not exist', keys[ 0 ]))
    }

    if (parentMap[ parentMap.length - 1 ].label === lab) {
      this.blockFinished = true
    }
  }

  mod.describe = async function describe (label, func) {
    if (!this.timeStarted) {
      mod.timeStarted = Date.now()
    }

    if (!this.mapOfTests) {
      this.mapOfTests = testMap('' + readFileSync(pathResolve(process.argv[ 1 ])))
      this.mapKeys = Object.keys(this.mapOfTests)

      /*
      console.info(testMapAsObj('' + readFileSync(pathResolve(process.argv[ 1 ]))))
      console.info(this.mapOfTests)
      */
    }

    this.tests[ label ] = {
      start: Date.now(),
      phase: 'describe'
    }

    if (func.constructor.name === 'AsyncFunction') {
      await func()
    } else {
      func()
    }

    this.tests[ label ].end = Date.now()
    printAResult()

    if (this.blockFinished && this.mapKeys.indexOf(label) === (this.mapKeys.length - 1)) {
      analyzeResults()
    }
  }

  return mod
}

module.exports = {
  init(process.argv)
}