import { Dlog } from '../src/index'

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

  test('test create stat', async (done) => {
    const dlog = new Dlog()
    dlog.resetAll()
    dlog.log('test Message')
    const results = await dlog.readStat()

    done(expect(results).toContain('read'))
  })

  afterEach(() => {

  })
})
