# Trigger Issue Action

GitHub action to generate an issue from text in a PR


## Usage

Assumes a GITHUB_TOKEN with sufficient permissions on source and destination repos.

```yaml
on:
  pull_request:
    types: [opened, edited]

steps:
  - name: Check for Issue Trigger
    id: run-action
    uses: sei-jmattson/trigger-issue-action@v1
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
