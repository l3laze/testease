'use strict'

const debug = require('ebug')('self-exam')

debug('Beginning...')

const { describe, it } = require('./../src/index.js')('Hello', 'world')

;

(async function asyncTests () {
  await describe('Batman - part 1', async function Batscription () {
    await it('Cannot die', async function batDed () {
      return false
    })

    await it('Cannot fail', async function batFail () {
      return false
    })
  })

  await describe('Batman - part 2', async function batscription2 () {
    await it('Is badass', async function batAss () {
      return true
    })

    await it('Is the knight', async function batKnight () {
      return true
    })
  })

  await describe('Joker - part 1 (async)', async function aJoke1 () {
    await it('Cannot be ended', async function jokeDed () {
      return false
    })

    await it('Cannot screw up', async function jokeChoke () {
      return false
    })
  })

  await describe('Joker - part 2 (async)', async function aJoke2 () {
    await it('Is nuts', async function jokeNuts () {
      return true
    })

    await it('Is insane', async function jokeInsane () {
      return true
    })
  })

  debug('Finished!')
}())
