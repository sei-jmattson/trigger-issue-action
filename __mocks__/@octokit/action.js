/**
 * Mock classes for OctoKit
 */
const Pulls = class {
  async get(p) {
    return Promise.resolve({
      data: {
        html_url: 'https://gitub.com/mock/mock/pulls/42',
        body: 'This PR does nothing, but /drr; This feature needs attention!'
      }
    })
  }
}

const Issues = class {
  create(p) {
    return Promise.resolve({})
  }
}

class MockOctokit {
  constructor() {
    this.pulls = new Pulls()
    this.issues = new Issues()
  }
}

const octokit = {
  Octokit: MockOctokit
}

module.exports = octokit
