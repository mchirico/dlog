import { Dlog } from '../src/index'
import { Stat } from '../src/statfile'

describe('Dlog', () => {
  beforeEach(async () => {
    const dlog = new Dlog()
    await dlog.resetAll()
  })

  test('creates a simple log write', async (done) => {
    const dlog = new Dlog()
    dlog.log('test Message')
    const results = await dlog.read()

    done(expect(results).toContain('test Message'))
  })

  test('creates a simple log append', async (done) => {
    const dlog = new Dlog()
    await dlog.append('test Message1')
    const results = await dlog.read()

    await dlog.append('test Message2')
    const results2 = await dlog.read()

    expect(results).toContain('test Message1')
    expect(results2).toContain('test Message2')
    done()
  })

  test('test stat logging', async (done) => {
    const dlog = new Dlog()
    await dlog.resetAll()
    dlog.log('test Message')
    const results = await dlog.readStat()

    done(expect(results).toContain('read'))
  })

  test('test create stat', async (done) => {
    const stat = new Stat()
    const timeStamp = Date()
    stat.logStat(timeStamp, 'test message')
    const results = await stat.readStat()

    done(expect(results).toContain('read'))
  })

  afterEach(() => {

  })
})
