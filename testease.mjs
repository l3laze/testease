'use strict'

function testease () { /* eslint-disable-line no-unused-vars */
  const results = {
    passed: 0,
    total: 0,
    message: '',
    start: 0
  }

  const check = '\u2714'
  const cross = '\u274C'
  const timeoutError = Symbol('Timeout error')

  function describe (label) {
    if (results.start === 0) {
      results.start = Date.now()
    }

    results.message += '\n' + label + '\n'
  }

  // https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
  // const timeout = (prom, time, exception) => {
  //   let timer;
  //   return Promise.race([
  //     prom,
  //     new Promise((resolve, reject) => {
  //       return timer = setTimeout(reject, time, exception)
  //     })
  //   ]).finally(() => clearTimeout(timer));
  // }

  // Based on https://stackoverflow.com/a/46675277/7665043
  const timedTest = (func, millis) => {
    let timeoutPid
    const timeout = new Promise((resolve, reject) => {
      timeoutPid = setTimeout(() => reject(timeoutError), millis)
    })

    return Promise.race([func(), timeout])
      .finally(function (result) {
        clearTimeout(timeoutPid)

        return result
      })
  }

  async function test (label, func, flags) {
    let testPassed = false
    let error

    results.total++

    if (typeof flags === 'undefined') {
      flags = {
        fails: false,
        timeLimit: -1
      }
    }

    try {
      testPassed = flags.timeLimit > -1
        ? await timedTest(func, flags.timeLimit, timeoutError)
        : func.constructor.name === 'AsyncFunction'
          ? await func()
          : func()

      // testPassed = await timedTest(func, (flags.timeLimit > -1 ? flags.timeLimit : 10000), timeoutError)

      if (testPassed === timeoutError) {
        testPassed = false
        throw new Error(`Failed after ${flags.timeLimit}ms`)
      } else if (testPassed.then && typeof testPassed.then === 'function') {
        testPassed = false
        throw new Error('Promise returned from test')
      } else if (typeof testPassed !== 'boolean') {
        testPassed = false
        throw new Error('No value returned from test')
      }
    } catch (e) {
      error = {
        message: (e === timeoutError ? `Failed after ${flags.timeLimit}ms.\n` : `Error: ${e.message}\n`)
      }
    }

    if (testPassed === false && flags.fails) {
      results.passed++
      results.message += `    ${check} [Expected Failure] ${label}\n\t${typeof error !== 'undefined' ? error.message : testPassed + '\n'}`
    } else if (testPassed === false && !flags.fails) {
      results.message += `    ${cross} ${label}\n\t${typeof error !== 'undefined' ? error.message : testPassed}\n`
    } else {
      results.passed++
      results.message += `    ${check} ${label}\n\t${testPassed}\n`
    }
  }

  async function it (label, func, time = -1) {
    await test(label, func, { timeLimit: time })
  }

  it.fails = async function (label, func, time = -1) {
    await test(label, func, { fails: true, timeLimit: time })
  }

  const reporter = function () {
    const end = Date.now()

    return `${results.message}\nFinished in ${end - results.start}ms\n${((results.passed / results.total * 100) + '').substring(0, 5)}% of tests passed (${results.passed}/${results.total})`
  }

  return {
    describe,
    it,
    reporter
  }
}

const { describe, it, reporter } = testease()

export {
  describe,
  it,
  reporter
}
