'use strict'

import { exec as execute } from 'node:child_process'
import util from 'node:util'

const exec = util.promisify(execute)

function b () {
  const results = []
  let timeTaken = 0
  let runnerStarted = 0
  let runnerTook = 0
  let average = 0
  let running = false

  async function bench (f, timeLimit = 5000, runLimit = 5) {
    running = true

    const runner = async function () {
      const start = Date.now()
      await exec(f)
      results.push(Date.now() - start)
    }

    const benchStart = Date.now()

    do {
      runnerStarted = Date.now()
      await runner()
      runnerTook = Date.now() - runnerStarted

      timeTaken += runnerTook
      average = Math.ceil(timeTaken / results.length)

      console.log(results.length, timeTaken)

      // Require at least runLimit runs + timeLimit before stopping.
      if (results.length >= runLimit && timeTaken >= (timeLimit - average)) {
        running = false
        break
      }
    } while (running)

    return {
      test: f + '',
      results,
      min: Math.min(...results),
      max: Math.max(...results),
      average,
      runs: results.length,
      timeLimit,
      timeTaken,
      benchTime: Date.now() - benchStart
    }
  }

  return {
    bench
  }
}

const bench = b().bench

export {
  bench
}
