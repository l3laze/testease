'use strict'

const { describe, it } = require('./../src/index.js')()

;

(async function test () {
  await describe('Hello', async function describeFn () {
    await it('world', async function itFn () {
      return true
    })
  })
}())
