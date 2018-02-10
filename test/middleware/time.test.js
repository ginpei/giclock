import { expect } from 'chai'
import { sTimeRange } from '../../middleware/time.js'

describe('time', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('sTimeRange', () => {
    it('works for 0 sec', () => {
      expect(sTimeRange(0)).to.eql('0m 0s')
    })

    it('works for one-digit second', () => {
      expect(sTimeRange(1000)).to.eql('0m 1s')
    })

    it('ceils numbers less than 1', () => {
      expect(sTimeRange(1)).to.eql('0m 1s')
      expect(sTimeRange(999)).to.eql('0m 1s')
      expect(sTimeRange(1001)).to.eql('0m 2s')
    })

    it('works for two-digit seconds', () => {
      expect(sTimeRange(10000)).to.eql('0m 10s')
      expect(sTimeRange(59000)).to.eql('0m 59s')
    })

    it('recognize 60 sec as 1 min', () => {
      expect(sTimeRange(60000)).to.eql('1m 0s')
      expect(sTimeRange(59001)).to.eql('1m 0s')
    })

    it('works for big number', () => {
      expect(sTimeRange(999 * 60 * 1000 + 59 * 1000)).to.eql('999m 59s')
    })

    it('add minus symbol to sec if it is less than 1 min', () => {
      expect(sTimeRange(-1000)).to.eql('0m -1s')
    })

    it('add minus symbol to min if it is equal to 1 min', () => {
      expect(sTimeRange(-60000)).to.eql('-1m 0s')
    })

    it('add minus symbol to min if it is more than 1 min', () => {
      expect(sTimeRange(-61000)).to.eql('-1m 1s')
    })

    it('floors numbers less than 1 if minus', () => {
      expect(sTimeRange(-1)).to.eql('0m 0s')
      expect(sTimeRange(-999)).to.eql('0m 0s')
      expect(sTimeRange(-1001)).to.eql('0m -1s')
      expect(sTimeRange(-59999)).to.eql('0m -59s')
      expect(sTimeRange(-60001)).to.eql('-1m 0s')
    })
  })
})
