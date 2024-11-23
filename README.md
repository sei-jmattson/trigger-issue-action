# Trigger Issue Action

GitHub Action to generate an issue from text in a PR

## Usage

See `action.yml` for inputs.

By default, posts issue to same repository (just for testing, really).
Otherwise, specify the repository where you want the issue created, and provide
a token with permission to do so (if necessary).

```yaml
on:
  pull_request:
    types: [opened, edited]

job:
  whatever:
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - name: Check for Issue Trigger
        id: run-action
        uses: sei-jmattson/trigger-issue-action@v1
        with:
          trigger: /drr
          title: Doc Review Requested
          repo: mock/mock-docs
          token: ${{ secrets.DOC_REPO_TOKEN}}
```
