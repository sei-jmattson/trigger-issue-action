const core = require('@actions/core')
const octokit_action = require('@octokit/action')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const octokit = new octokit_action.Octokit()

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
    const [pull_number, _] = process.env.GITHUB_REF_NAME.split('/')

    let issue_repo = core.getInput('repo')
    if (!issue_repo.includes('/')) {
      issue_repo = `/${issue_repo}`
    }

    const [ir_owner, ir_repo] = issue_repo.split('/')

    const { data: pullRequest } = await octokit.pulls.get({
      owner,
      repo,
      pull_number
    })

    const trigger = core.getInput('trigger')
    const re = new RegExp(`${trigger}(\\W*)(.*)`)
    const match = pullRequest.body.match(re)

    if (match) {
      octokit.issues.create({
        owner: ir_owner || owner,
        repo: ir_repo || repo,
        title: core.getInput('title'),
        body: `[${repo} #${pull_number}](${pullRequest.html_url})\n${match.pop()}`
      })
      core.setOutput('posted', 'true')
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
