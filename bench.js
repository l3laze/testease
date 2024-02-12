'use strict'

function bench () {
  const results = []
  let timeTaken = 0
  let runnerStarted = 0
  let runnerTook = 0

  function formatResults () {
    return results
  }

  async function benchmark (f, timeLimit) {
    const runner = async function () {
      const start = Date.now()
      await f()
      results.push(Date.now() - start)
    }

    const benchStart = Date.now()

    do {
      runnerStarted = Date.now()
      await runner()
      runnerTook = Date.now() - runnerStarted

      timeTaken += runnerTook

      if (timeTaken >= (timeLimit -
          Math.ceil(results.reduce((accumulator, current) => accumulator + current, 0) / results.length))) {
        break
      }
    } while (true)

    return {
      results: formatResults(),
      min: Math.min(...results),
      max: Math.max(...results),
      average: Math.ceil(results.reduce((accumulator, current) => accumulator + current, 0) / results.length),
      runs: results.length,
      timeLimit,
      timeTaken,
      benchTime: Date.now() - benchStart
    }
  }

  return {
    benchmark
  }
}

const benchmark = bench().benchmark

export {
  benchmark
}
