# testease

A simplified/toy Mocha-inspired test tool.

[![Generic badge](https://img.shields.io/badge/Vanilla-grey?logo=Javascript)](https://shields.io/)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/75eeb5d0ccfb41a8916ed8ebaee38acb)](https://app.codacy.com/gh/l3laze/testease/dashboard)
[![codecov](https://codecov.io/gh/l3laze/testease/branch/master/graph/badge.svg)](https://codecov.io/gh/l3laze/testease)

![GitHub License](https://img.shields.io/github/license/l3laze/testease?color=blue)

*Single file, without minifying, and no dependencies in production.*

![Testease size](https://img.badgesize.io/l3laze/testease/master/testease.js?label=source)
![Testease size](https://img.badgesize.io/l3laze/testease/master/testease.js?compression=gzip&label=gzip)

----

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
* [Why?](#why)
* [License](#license)

----

### Installation

Download `testease.js` and drop it somewhere accessible to your project.

----

### Usage

```javascript
  'use strict'

  import { describe, it, reporter } from './testease.js'

  async function selfExam () {
    describe('Testease Framework')

    await it('is simple and familiar enough', async function () {
      return true
    }, 6900)

    const results = await reporter()

    return results
  }

  selfExam().then((result) => {
    console.log(result)
  })

```

For more see the source code in `testease.js`, and related tests in `self-exam.js`.

----

### Documentation

#### function describe (*label*, *testFunc*[, *timeout* = -1])

> Describe what is going to be tested. For creating blocks.

* ***label*** - required; Shown in test results.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ----

#### async function it (*label*, *testFunc*[, *timeout* = -1])

> A single test. The `testFunc` function must return **true** to pass.

* ***label*** - required; Shown in test results.
* ***testFunc*** - required; A single test as a func; must return true to pass.
* ***timeout*** - optional; Millisecond timeout of async testFunc. Default = -1, disabled.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ----

#### async function it.fails (*label*, *testFunc*[, *timeout* = -1])

> A single test. The `testFunc` function must return **false** to pass.

* ***label*** - required; Shown in test results.
* ***testFunc*** - required; A single test as a func; must return false to pass.
* ***timeout*** - optional; Millisecond timeout of async testFunc. Default = -1, disabled.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ----

#### async function reporter

> Test results are built up by running tests. This adds on the time taken from tests
starting to reporter being called, and calculates the percentage passed for
"N% passed (N passed/N total)".

* ***no args***

> Returns the results as a string.

----

### Why?

A few years ago while using Mocha I got frustrated and annoyed by it
repeatedly. So, I wanted to see if I could make something with no
dependencies that is lighter, faster, and easier to use. The
original testease was faster and lighter even with the overhead of
instrumenting the code. It was also hard to maintain or debug. In the
years since I've built a few more basic test frameworks, first in
Bash and later in JS, which slowly circled back to this again.

* Bash
  * [Earliest version](https://github.com/l3laze/toys/blob/master/testease/testease.sh)  made on mobile thanks to [UserLAnd](https://github.com/CypherpunkArmory/UserLAnd) & Ubuntu Linux.
  * [Later version, similar enough to JS](https://github.com/l3laze/sind/blob/master/test.sh).

* JS
  * [This project helped bring testease back to JS, and then died - horribly](https://github.com/l3laze/gitui/blob/main/app/src/main/assets/gitui/jit.js).
  * [Very close to the current iteration](https://github.com/l3laze/scassistant/blob/main/scripts/testease.js).

----

### License

MIT License

Copyright (c) 2024 Tom Shaver

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
