/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const main = require('../src/main')

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug').mockImplementation()
const getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  const env = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  it('posts an issue', async () => {
    process.env.GITHUB_REF_NAME = '42/merge'
    process.env.GITHUB_REPOSITORY = 'mock/mock'
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trigger':
          return '/jam'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'true')
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'posted', true)
  })

  it('finds no trigger', async () => {
    process.env.GITHUB_REF_NAME = '42/merge'
    process.env.GITHUB_REPOSITORY = 'mock/mock'
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'trigger':
          return '/skip'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'true')
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'posted', false)
  })
})
