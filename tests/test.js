'use strict'

const { describe, it } = require('./../index.js')('Hai', 'whirled')
// const { methodF1, methodF2 } = require('./function.js')('Hai', 'whirled')

;

(async function test () {
  await describe('Hello', async function describeFn () {
    await it('world', async function itFn () {
      // console.info('n stuff')
      return true
    })
  })
}())
