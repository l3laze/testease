function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
const timeout = (prom, time, exception) => {
  let timer
  return Promise.race([
    prom,
    new Promise((resolve, reject) => {
      timer = setTimeout(reject, time, exception)
      return timer
    })
  ]).finally(() => clearTimeout(timer))
}

const timeoutError = Symbol('timeout')
try {
  const result = await timeout((async () => {
    await sleep(5)
  })(), 0, timeoutError)

  console.log(result)
} catch (e) {
  if (e === timeoutError) {
    console.log('Timeout')
  } else {
    throw e
  }
}
