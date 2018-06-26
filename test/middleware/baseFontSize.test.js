import { expect } from 'chai'
import { calculateFontSize } from '../../middleware/baseFontSize.js'

describe('baseFontSize', () => {
  // beforeEach(() => {
  // })

  // afterEach(() => {
  // })

  describe('calculateFontSize', () => {
    it('calculates for square', () => {
      expect(calculateFontSize({ height: 100, width: 100 })).to.eql(1)
    })

    it('calculates for landscape', () => {
      expect(calculateFontSize({ height: 99, width: 100 })).to.eql(1)
    })

    it('calculates for edge landscape', () => {
      expect(calculateFontSize({ height: 50, width: 100 })).to.eql(1)
    })

    it('calculates for edge narrow landscape', () => {
      expect(calculateFontSize({ height: 49, width: 100 })).to.eql(49 / 50)
    })

    it('calculates for narrow landscape', () => {
      expect(calculateFontSize({ height: 50, width: 999 })).to.eql(1)
    })

    it('calculates for portlate', () => {
      expect(calculateFontSize({ height: 100, width: 99 })).to.eql(1)
    })

    it('calculates for edge portlate ', () => {
      expect(calculateFontSize({ height: 100, width: 50 })).to.eql(1)
    })

    it('calculates for edge narrow portlate', () => {
      expect(calculateFontSize({ height: 100, width: 49 })).to.eql(49 / 50)
    })

    it('calculates for narrow portlate ', () => {
      expect(calculateFontSize({ height: 999, width: 50 })).to.eql(1)
    })
  })
})
