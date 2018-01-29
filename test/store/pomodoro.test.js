import { expect } from 'chai'
import sinon from 'sinon'
import { actions, getters } from '../../store/pomodoro.js'

// string to timestamp length
// s2tl('1m') === 60000
function s2tl (str) {
  // 123m
  if (str.match(/^\d+m$/)) {
    return parseInt(str) * 60 * 1000
  }
  else {
    console.error(`s2tl: ${str}`)
    throw new Error('Unsupported format')
  }
}

describe('pomodoro', () => {
  const now = new Date('2000/01/01 00:00:00').getTime()
  let clock, state, commit, dispatch

  beforeEach(() => {
    clock = sinon.useFakeTimers({ now })
    state = {
      length: s2tl('25m'),
      startedAt: now,
    }
    commit = sinon.spy()
    dispatch = sinon.spy()
  })

  afterEach(() => {
    clock.restore()
  })

  describe('actions', () => {
    describe('start', () => {
      let getters

      beforeEach(() => {
        getters = {
          getRemainingTime: sinon.mock(),
        }
      })

      describe('with length 12m', () => {
        beforeEach(() => {
          actions.start({ state, getters, commit, dispatch }, { length: s2tl('12m') })
        })

        it('sets start time', () => {
          const args = commit.getCall(0).args
          expect(args[0]).to.eql('setStartedAt')
          expect(args[1]).to.eql(new Date('2000/01/01 00:00:00').getTime())
        })

        it('sets length', () => {
          const args = commit.getCall(1).args
          expect(args[0]).to.eql('setLength')
          expect(args[1]).to.eql(s2tl('12m'))
        })
      })

      describe('without length', () => {
        it('throws an error', () => {
          expect(() => {
            actions.start({ state, getters, commit, dispatch })
          }).to.throw()
        })
      })
    })

    describe('stop', () => {
      let getters

      beforeEach(() => {
        clock.tick(s2tl('15m'))
        getters = {
          getRemainingTime: sinon.mock(),
        }
      })

      describe('before finishing', () => {
        beforeEach(() => {
          getters.getRemainingTime.returns(s2tl('10m'))
          actions.stop({ state, getters, commit, dispatch })
        })

        it('sets remaining time', () => {
          const args = commit.getCall(0).args
          expect(args[0]).to.eql('setBaseRemainingTime')
          expect(args[1]).to.eql(s2tl('10m'))
        })

        it('resets start time', () => {
          const args = commit.getCall(1).args
          expect(args[0]).to.eql('setStartedAt')
          expect(args[1]).to.eql(0)
        })

        it('resets callback', () => {
          const args = commit.getCall(2).args
          expect(args[0]).to.eql('setCallback')
          expect(args[1]).to.eql(null)
        })

        it('saves', () => {
          const args = dispatch.getCall(0).args
          expect(args[0]).to.eql('save')
        })
      })

      describe('when finish', () => {
        beforeEach(() => {
          getters.getRemainingTime.returns(0)
          actions.stop({ state, getters, commit, dispatch })
        })

        it('resets remaining time', () => {
          const args = commit.getCall(0).args
          expect(args[0]).to.eql('setBaseRemainingTime')
          expect(args[1]).to.eql(0)
        })
      })

      describe('after finishing', () => {
        beforeEach(() => {
          getters.getRemainingTime.returns(-999)
          actions.stop({ state, getters, commit, dispatch })
        })

        it('resets remaining time', () => {
          const args = commit.getCall(0).args
          expect(args[0]).to.eql('setBaseRemainingTime')
          expect(args[1]).to.eql(0)
        })
      })
    })
  })

  describe('getters', () => {
    describe('getRemainingTime', () => {
      describe('without base remaining time', () => {
        beforeEach(() => {
          state.baseRemainingTime = 0
        })

        it('returns full length', () => {
          const result = getters['getRemainingTime'](state)(Date.now())
          expect(result).to.eql(s2tl('25m'))
        })

        it('returns advanced time after ticking', () => {
          clock.tick(s2tl('10m'))
          const result = getters['getRemainingTime'](state)(Date.now())
          expect(result).to.eql(s2tl('15m'))
        })
      })

      describe('with base remaining time', () => {
        beforeEach(() => {
          state.baseRemainingTime = s2tl('10m')
        })

        it('returns base remaining time', () => {
          const result = getters['getRemainingTime'](state)(Date.now())
          expect(result).to.eql(s2tl('10m'))
        })

        it('returns time considering base remaining time after ticking', () => {
          clock.tick(s2tl('5m'))
          const result = getters['getRemainingTime'](state)(Date.now())
          expect(result).to.eql(s2tl('5m'))
        })
      })
    })
  })
})
