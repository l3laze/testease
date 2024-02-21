'use strict'

/* global describe, it */

import assert from 'assert'

describe('Mocha', async function () {
  it('Mocha is bloated', async function () {
    assert('Mocha is bloated'.indexOf('Mocha') > -1)
  })
})
