'use strict'

import { describe, it, reporter } from './testease.js'
import { benchmark } from './bench.js'

async function selfExam () {
  describe('Testease Framework')

  it('allows synchronous success', function () {
    return true
  })

  it.fails('allows synchronous failure', function () {
    return false
  })

  await it('allows async success', async function () {
    return true
  })

  await it.fails('allows async failure', async function () {
    return false
  })

  await it.fails('allows timeout of async tests', async function () {
    await new Promise(resolve => setTimeout(resolve, 100))

    return true
  }, 0)

  it.fails('catches synchronous errors', function () {
    throw new Error('Hello, error!')
  })

  await it.fails('catches async errors', async function () {
    throw new Error('Hello, error!')
  })

  it.fails('errors on non-boolean result - Number', function () {
    return 0
  })

  it.fails('errors on non-boolean result - String', function () {
    return 'Hello'
  })

  it.fails('errors on non-boolean result - Object', function () {
    return {
      result: true
    }
  })

  it.fails('errors on non-boolean result - Array', function () {
    return [true]
  })

  it.fails('errors on non-boolean result - Symbol', function () {
    return Symbol('Oops')
  })

  it.fails('errors on non-boolean result - function', function () {
    const dummy = function dummy () {}
    dummy()
    return dummy
  })

  it.fails('errors on non-boolean result - Promise', function () {
    return (async () => 'World!')()
  })

  it.fails('errors on attempted timeout of sync code', function () {
  }, 0)

  it('fails successfully (for coverage)', function () {
    throw new Error('Oops')
  })

  return await reporter()
}

const args = process?.argv.slice(2).map(a => a.toLowerCase())
const options = {
  silent: false
}

if (args.includes('--silent') || args.includes('-q')) {
  options.silent = true
}

if (args.includes('--bench') || args.includes('-b')) {
  const timeLimit = parseInt(args.filter(a => /\d+/.test(a))[0]) || 500

  benchmark(selfExam, timeLimit).then(result => {
    if (!options.silent) {
      console.log(result)
    }
  })
} else {
  selfExam().then(result => {
    if (!options.silent) {
      console.log(result)
    }
  })
}
