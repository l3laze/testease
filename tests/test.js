'use strict'

const { describe, it } = require('mocha')
// const { methodF1, methodF2 } = require('./function.js')('Hai', 'whirled')

describe('Async', function describeFn() {
  it('passes', async function itFn() {
    return true
  })

  it('fails', async function itFn() {
    throw new Error('Fail')
  })
})

describe('Sync', function describeFn () {
  it('passes', function itFn () {
    // console.info('n stuff')
    return true
  })

  it('fails', function itFn() {
    throw new Error('Fail')
  })
})
