'use strict'

function testease () {
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

  // Based on https://stackoverflow.com/a/46675277/7665043
  //   and https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
  const timedCall = async (func, millis) => {
    let timeoutPid
    /* eslint-disable-next-line */
    const timeout = new Promise((reject) => {
      /* eslint-disable-next-line */
      timeoutPid = setTimeout(() => reject(timeoutError), millis)
    })

    return Promise.race([new Promise((resolve) => resolve(func())), timeout])
      .finally(function (result) {
        clearTimeout(timeoutPid)

        return result
      })
  }

  async function test (label, func, flags) {
    let testResult = false
    let error

    results.total++

    try {
      const constructorName = func.constructor.name

      if (flags.timeLimit > -1 && constructorName !== 'AsyncFunction') {
        throw new Error('Cannot use a timeout in this context.')
      }

      testResult = flags.timeLimit > -1
        ? await timedCall(func, flags.timeLimit)
        : constructorName === 'AsyncFunction'
          ? await func()
          : func()

      if (testResult === timeoutError) {
        testResult = false
        throw timeoutError
      } else if (typeof testResult !== 'boolean') {
        testResult = false
        throw new Error('Non-boolean value returned from test.')
      }
    } catch (e) {
      error = {
        message: (e === timeoutError
          ? `Failed after ${flags.timeLimit}ms.\n`
          : `Error: ${e.message}\n`)
      }
    }

    if (flags.fails && !testResult) {
      results.passed++
      results.message += `    ${check} ${label}\n\t${typeof error !== 'undefined' ? error.message.trim() : testResult} [Expected Failure]\n`
    } else if ((!testResult && !flags.fails) || (testResult && flags.fails)) {
      results.message += `    ${cross} ${label}\n\t${error.message}\n`
    } else if (testResult && !flags.fails) {
      results.passed++
      results.message += `    ${check} ${label}\n\t${testResult}\n`
    }
  }

  async function it (label, func, time = -1) {
    await test(label, func, { timeLimit: time })
  }

  it.fails = async function (label, func, time = -1) {
    await test(label, func, { fails: true, timeLimit: time })
  }

  const reporter = async function () {
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
