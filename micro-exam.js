'use strict'

import { describe, it, reporter } from './testease.js'

async function selfExam () {
  describe('Testease Framework')

  await it('Is kind of ugly too', async function () {
    /* eslint-disable-next-line */
    return new Promise((resolve) => {
      resolve(true)
    })
  })

  const results = await reporter()

  return results
}

console.log(await selfExam())
