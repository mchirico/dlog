import { Dlog } from '../src/index'

describe('Dlog', () => {
  beforeEach(() => {
    const dlog = new Dlog()
    dlog.reset()
  })

  test('creates a simple log', async (done) => {
    const dlog = new Dlog()
    dlog.log('test Message')
    const results = dlog.read()
    done(expect(results).toContain('test Message'))
  })

  afterEach(() => {

  })
})
