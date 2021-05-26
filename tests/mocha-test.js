'use strict'

const { describe, it } = require('mocha')

async function af () {
  describe('Async', async function describeFn () {
    it('passes', async function itFn () {
      return true
    })

    it('fails', async function itFn () {
      throw new Error('Fail')
    })
  })
}

af()

describe('Sync', function describeFn () {
  it('passes', function itFn () {
    // console.info('n stuff')
    return true
  })

  it('fails', function itFn () {
    throw new Error('Fail')
  })
})
