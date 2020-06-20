import { Dlog } from '../src/index'
import { Stat } from '../src/statfile'

describe('Dlog', () => {
  beforeEach(() => {
    const dlog = new Dlog()
    dlog.resetAll()
  })

  test('creates a simple log', async (done) => {
    const dlog = new Dlog()
    dlog.log('test Message')
    const results = await dlog.read()

    done(expect(results).toContain('test Message'))
  })

  test('test stat logging', async (done) => {
    const dlog = new Dlog()
    dlog.resetAll()
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
