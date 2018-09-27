'use strict'

const { describe, it } = require('./../index.js')('Hai', 'whirled')

;

(async function test () {
  await describe('Hello', async function describeFn () {
    await it('world', async function itFn () {
      return true
    })
  })
}())
