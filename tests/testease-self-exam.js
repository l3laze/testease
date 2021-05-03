'use strict'

const { describe, it } = require('./../src/index.js')({ exitWithFailNum: false })

;

(function syncTests () {
  describe('Synchronous', function description () {
    it('Passes', function pass () {
      return true
    })

    it('Fails', function fail () {
      return false
    })

    it('throws', function throws () {
      throw new Error('Oops')
    })
  })
}())

;

(async function asyncTests () {
  await describe('Asynchronous', async function description () {
    await it('Passes', async function pass () {
      return true
    })

    await it('Fails', async function fail () {
      return false
    })

    await it('throws', async function throws () {
      throw new Error('Oops')
    })
  })
}())
