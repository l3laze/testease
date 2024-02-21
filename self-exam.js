'use strict'

import { describe, it, reporter } from './testease.js'

async function selfExam () {
  describe('Testease Framework')

  it('synchronous success', function () {
    return true
  })

  it('async success', async function () {
    return true
  })

  it.fails('synchronous failure', function () {
    return false
  })

  it.fails('async failure', async function () {
    return false
  })

  it.fails('timeout of async tests', async function () {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return true
  }, 0)

  it.fails('catches synchronous errors', function () {
    throw new Error('Hello, error!')
  })

  it.fails('catches async errors', async function () {
    throw new Error('Hello, error!')
  })

  it.fails('non-boolean as test result causes failure', function () {
    return 0
  })

  it.fails('errors on attempted timeout of sync code', function () {
  }, 0)

  it('fails successfully (for coverage)', function () {
    throw new Error('Oops')
  })

  const results = await reporter()

  return results
}

selfExam().then((results) => {
  console.log(results)
})

/*
  const args = process?.argv.slice(2).map((a) => a.toLowerCase())
  const options = {
    silent: false
  }

  if (args.includes('--silent') || args.includes('-q')) {
    options.silent = true
  }

  selfExam().then((result) => {
    if (!args.includes('--silent') && !args.includes('-q')) {
      console.log(result)
    }
  })
*/
