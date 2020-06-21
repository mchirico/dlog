![CI](https://github.com/mchirico/dlog/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/mchirico/dlog/branch/master/graph/badge.svg)](https://codecov.io/gh/mchirico/dlog)
# dlog

A simple async debug logging module.

### Install

```js

npm install @mchirico/dlog

```

Now use it in your code.

```js
import {Dlog} from '@mchirico/dlog'

const l = new Dlog()
await l.logonce('something to log')

await l.log('more data')

# remove logs
await l.resetAll()

```

Or, if you have many fast write
and reads.. see the test where await can help.

```js
test('creates a simple log append', async (done) => {
    const dlog = new Dlog()
    await dlog.log('test Message1')
    const results = await dlog.read()

    await dlog.log('test Message2')
    const results2 = await dlog.read()

    expect(results).toContain('test Message1')
    expect(results2).toContain('test Message2')
    done()
  })
```

