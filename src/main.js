const core = require('@actions/core')
const octokit_action = require('@octokit/action')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    let octokit = new octokit_action.Octokit()
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
    const [pull_number, _] = process.env.GITHUB_REF_NAME.split('/')

    const { data: pullRequest } = await octokit.pulls.get({
      owner,
      repo,
      pull_number
    })

    const trigger = core.getInput('trigger')
    const re = new RegExp(`${trigger}(\\W*)(.*)`)
    const match = pullRequest.body.match(re)

    if (match) {
      const issue_repo = core.getInput('repo') || process.env.GITHUB_REPOSITORY
      const [ir_owner, ir_repo] = issue_repo.split('/')
      const issue = {
        owner: ir_owner,
        repo: ir_repo,
        title: core.getInput('title'),
        body: `[${repo} #${pull_number}](${pullRequest.html_url})\n${match.pop()}`
      }

      if (issue_repo !== process.env.GITHUB_REPOSITORY) {
        core.debug('change auth')
        process.env.GITHUB_TOKEN = core.getInput('repo_token')
        octokit = new octokit_action.Octokit({
          auth: core.getInput('repo_token')
        })
      }

      octokit.issues.create(issue)
    }
    core.setOutput('posted', !!match)
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
