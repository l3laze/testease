/* eslint-env mocha */

'use strict'

const chai = require('chai')
/* istanbul-ignore-next */
const should = chai.should()

;

describe('#require(\'testease\')', function initsOnRequire () {
  it('should return a function', function initReturnsFuncs () {
    const { analysis, describe: describe_te, it: it_te } = require('./../index.js')

    analysis.should.be.a('function')
    describe_te.should.be.a('function')
    it_te.should.be.a('function')
  })
})

describe('#testease - synchronous tests, failing', function testeaseFailingSync () {
  const { analysis, describe: describe_te, it: it_te } = require('./../index.js')

  it('works for synchronous tests that fail', function testeaseTesting123FailingSync () {
    describe_te('Batman - part 2', function batscription1 () {
      it_te('Cannot die', function batDed () {
        return false
      })

      it_te('Cannot fail', function batFail () {
        return false
      })
    })

    analysis()
  })
})

describe('#testease - synchronous tests, passing', function testeasePassingSync () {
  const { analysis, describe: describe_te, it: it_te } = require('./../index.js')

  it('works for synchronous tests that pass', function testeaseTesting123PassingSync () {
    describe_te('Batman - part 1', function batscription2 () {
      it_te('Is badass', function batAss () {
        return true
      })

      it_te('Is the knight', function batKnight () {
        return true
      })
    })

    analysis()
  })
})

describe('#testease - asynchronous tests, failing', async function testeaseFailingAsync () {
  const { analysis, describe: describe_te, it: it_te } = require('./../index.js')

  it('works for asynchronous tests that fail', async function testeaseTesting123FailingAsync () {
    await describe_te('Joker - part 1', async function aJoke1 () {
      await it_te('Cannot be ended', async function jokeDed () {
        return false
      })

      await it_te('Cannot screw up', async function jokeChoke () {
        return false
      })
    })

    analysis()
  })
})

describe('#testease - asynchronous tests, passing', async function testeasePassingAsync () {
  const { analysis, describe: describe_te, it: it_te } = require('./../index.js')

  it('works for asynchronous tests that pass', async function testeaseTesting123PassingAsync () {
    await describe_te('Joker - part 2', async function aJoke2 () {
      await it_te('Is nuts', async function jokeNuts () {
        return true
      })

      await it_te('Is insane', async function jokeInsane () {
        return true
      })
    })

    analysis()
  })
})
