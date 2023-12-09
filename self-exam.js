'use strict'

import { describe, it, reporter } from './testease.mjs'

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function selfExam () { /* eslint-disable-line no-unused-vars */
  describe('Testease Framework')

  it('Can handle synchronous success cases', function () {
    return true
  })

  await it('Can handle asynchronous success cases', async function () {
    return true
  })

  await it('Can handle timed async success cases', async function () {
    await sleep(0)

    return true
  }, 5)

  it.fails('Can handle synchronous failure cases', function () {
    return false
  })

  it.fails('Can handle synchronous error cases', function () {
    throw new Error('Hello, error!')
  })

  await it.fails('Can handle asynchronous failure cases', async function () {
    return false
  })

  await it.fails('Can handle asynchronous error cases', async function () {
    throw new Error('Hello, error!')
  })

  await it.fails('Can timeout async tests', async function () {
    await sleep(1)

    return false
  }, 0)

  it.fails('Test must return boolean', function () {
    return 0
  })

  it.fails('Fails to handle async code in a synchronous context', function () {
    return sleep(0)
  })

  return reporter()
}

selfExam().then(result => console.log(result))
