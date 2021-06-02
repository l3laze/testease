'use strict'

const { describe, it } = require('./../src/index-rebuilt.js')()

describe('Synchronous', function description () {
  it('Passes', function pass () {
    return true
  })

  it('Fails', function fail () {
    return false
  })

  it('Throws', function throws () {
      throw new Error('Oops')
  })
})

async function af() {
  await describe('Asynchronous', async function description () {
    await it('Passes', async function pass () {
      return true
    })

    await it('Fails', async function fail () {
      return false
    })

    await it('Throws', async function throws () {
      throw new Error('Oops')
    })
  })
}

af()