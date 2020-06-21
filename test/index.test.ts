import { Dlog } from '../src/index'
import { Stat } from '../src/statfile'

describe('Dlog', () => {
  beforeEach(async () => {
    const dlog = new Dlog()
    dlog.resetAll()
  })

  test('creates a simple logonce write', async (done) => {
    const dlog = new Dlog()
    await dlog.logonce('test Message')
    const results = await dlog.read()

    done(expect(results).toContain('test Message'))
  })

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

  test('test stat logging', async (done) => {
    const dlog = new Dlog()
    await dlog.resetAll()
    await dlog.logonce('test Message')
    const results = await dlog.readStat()

    done(expect(results).toContain('read'))
  })

  test('test create stat', async (done) => {
    const stat = new Stat()
    const timeStamp = Date()
    await stat.logStat(timeStamp, 'test message')
    const results = await stat.readStat()

    done(expect(results).toContain('read'))
  })

  test('test reset', async (done) => {
    const dlog = new Dlog()
    await dlog.logonce('test Message')
    const results = await dlog.read()

    expect(results).toContain('test Message')
    await dlog.reset()

    try {
      const r = await dlog.read()
      expect(r).toContain('no such file or directory, open')
    } catch (error) {
      expect(error.toString()).toContain('no such file or directory, open')
    }

    await dlog.logonce('test 2 taco')
    const results2 = await dlog.read()

    done(expect(results2).toContain('test 2 taco'))
  })

  afterEach(() => {

  })
})
