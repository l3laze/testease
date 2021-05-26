const cli = require ('cli')
const options = cli.parse({
  failures: [ 'f', 'Exit with number of failures to cause a build error.', 'true', false ]
})
const { describe, it } = require('./index-rebuilt.js')(options)

describe('cli', function descCLI () {
  it('initializes with args', function takesArgs () {
    return true
  })
})
