# 🔖 Package Version Action

GitHub Action to get the latest release version and a SHA suffix for unique versions.

[![Build CI](https://github.com/koj-co/package-version-action/workflows/Build%20CI/badge.svg)](https://github.com/koj-co/package-version-action/actions?query=workflow%3A%22Build+CI%22)
[![Test CI](https://github.com/koj-co/package-version-action/workflows/Test%20CI/badge.svg)](https://github.com/koj-co/package-version-action/actions?query=workflow%3A%22Test+CI%22)
[![Release CI](https://github.com/koj-co/package-version-action/workflows/Release%20CI/badge.svg)](https://github.com/koj-co/package-version-action/actions?query=workflow%3A%22Release+CI%22)
[![Node CI](https://github.com/koj-co/package-version-action/workflows/Node%20CI/badge.svg)](https://github.com/koj-co/package-version-action/actions?query=workflow%3A%22Node+CI%22)

## ⭐ Get started

This Action returns a recommend image name. For example, if you want to publish a new Docker image:

```yaml
name: Docker CI
on:
  workflow_dispatch:
jobs:
  test:
    name: Deploy to Docker
    runs-on: ubuntu-latest
    steps:
      - name: Get package version
        id: package-version
        uses: koj-co/package-version-action@v1.0.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push to Docker
        uses: docker/build-push-action@v2
        with:
          push: true
          tags: username/anand:${{ steps.package-version.outputs.package-version }}
          # ->  username/anand:v1.23.21
```

### Outputs

| Output name                  | Description                | Example value                       |
| ---------------------------- | -------------------------- | ----------------------------------- |
| `package-version`            | Latest release version     | v2.23.1                             |
| `package-version-timestamp`  | Version + unix timestamp   | v2.23.1-1609693587                  |
| `short-hash`                 | Last commit hash           | 1abc9c3                             |
| `package-version-short-hash` | Version + commit hash      | v2.23.1-1abc9c3                     |
| `package-version-random`     | Version + random string    | v2.23.1-238a32ef21                  |
| `date-hash`                  | Date + commit hash         | 2020-12-29-238a32ef21               |
| `date-time-hash`             | ISO datetime + commit hash | 2020-12-29T09:35:34.759Z-238a32ef21 |

## 📄 License

- Code: [MIT](./LICENSE) © [Koj](https://koj.co)
- "GitHub" is a trademark of GitHub, Inc.

<p align="center">
  <a href="https://koj.co">
    <img width="44" alt="Koj" src="https://kojcdn.com/v1598284251/website-v2/koj-github-footer_m089ze.svg">
  </a>
</p>
<p align="center">
  <sub>An open source project by <a href="https://koj.co">Koj</a>. <br> <a href="https://koj.co">Furnish your home in style, for as low as CHF175/month →</a></sub>
</p>
