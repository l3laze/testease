'use strict'

const { readFileSync } = require('fs')
const readFileAsync = require('util').promisify(require('fs').readFile)
const { resolve: pathResolve } = require('path')
const { format } = require('util')
const [ red, green, yellow, reset] = [ '\u001B[31m', '\u001B[32m', '\u001B[33m', '\u001B[0m' ]
const passed = format('%s%s %s', green, '\u2713', reset) // Green check mark
const failed = format('%s%s %s', red, '\u2620', reset) // Red skull & crossbones
let [ tests, timeStarted, testsPassed, testsTotal, blockFinished, mapOfTests, mapKeys ] = [ {}, false, 0, 0, false ]

function printResults () {
  const keys = Object.keys(tests)
  let [ message, i, diff ] = [ '' ]

  for (i = 0; i < keys.length; i++) {
    message = ' '
    diff = tests[keys[ i ]].end - tests[keys[ i ]].start
    if (tests[keys[ i ]].phase === 'describe') {
      message = '\n '
    }

    if (typeof tests[keys[ i ]].result !== 'undefined') {
      message += ' '.repeat(3) + (tests[keys[ i ]].result === true ? passed : failed) + ' '
    }

    message += `${keys[ i ]} ${format('+%dms', diff)}`
    console.info(message)
  }

  tests = {}
}

async function testMap (file) {
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

      re = line.match(/['"](\w|\s|\d|\-|_|\(|\))+['"]/)
      if (re !== null) {
        // console.info(re)
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

async function analysis () {
  const time = Date.now() - timeStarted
  const message = (testsPassed === testsTotal)
    ? format('\n  %s%d/%d passed%s (%dms)', green, testsPassed, testsTotal, reset, time)
    : format('\n%s! %s%d/%d failed%s (%dms)', yellow, red, testsTotal - testsPassed, testsTotal, reset, time)

  console.info(message + '\n')
  timeStarted = false
  testsPassed = 0
  testsTotal = 0
}

async function it (lab, fn) {
  tests[ lab ] = {
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

  tests[ lab ].end = Date.now()
  tests[ lab ].result = !!+result

  if (result) {
    testsPassed++
  }

  testsTotal++

  try {
    const keys = Object.keys(tests)
  
    let [ index, parentMap ] = [ keys.indexOf(lab) ]

    parentMap = mapOfTests[keys[ 0 ]]

    if (parentMap === null) {
      throw new Error(format('%s does not exist', keys[ 0 ]))
    }

    if (parentMap[ parentMap.length - 1 ].label === lab) {
      blockFinished = true
    }

  } catch (err) {
    throw err
  }
}

async function describe (label, func) {
  if (!timeStarted) {
    timeStarted = Date.now()
  }

  tests[ label ] = {
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

  tests[ label ].end = Date.now()
  printResults()

  if (blockFinished && mapKeys.indexOf(label) === (mapKeys.length - 1)) {
    await analysis()
  }
}

async function init () {
  const startInit = Date.now()
  process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
  })

  if (!mapOfTests) {
    mapOfTests = await testMap('' + readFileSync(pathResolve(process.argv[ 1 ])))
    // console.info(mapOfTests)
    mapKeys = Object.keys(mapOfTests)
  }

  return Date.now() - startInit
}

init().then((diff) => {
  console.error('Dropped testease in %dms', diff)
})

module.exports = {
 describe,
 it
}
