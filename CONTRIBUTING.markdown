
# Contributing

- Always add tests
- Update documentation if needed
- Do not commit build artifacts in the `dist` directory

## Bug fixes

Always add a test for the bug in a separate commit so we can easily cherry pick
it for verification.

## New features

It's recommended to open an issue before sending a pull request to avoid
unnecessary work. There are quite few areas we consider to be out of scope for
this library. Idea is to add few generic string helpers for Javascript. For
example anything related to internationalization or is too language specific
is out of scope.

## Release checklist

(for maintainers)

  - Write a changelog entry to `CHANGELOG.markdown`
    - Use Github compare to see what has changed from previous tag. Ex https://github.com/epeli/underscore.string/compare/3.0.0...master 
  - Update the version in the `package.json`
  - Publish a new version of _.string `npm run release`
  - Update the [gh-pages][ghp] branch `gulp bump --semver <version> && gulp site`
    - You need global installation of bower for this to work
    - Local workaround:
      - `npm install bower`
      - `export PATH=$(pwd)/node_modules/.bin/:$PATH`

[d]: https://github.com/epeli/underscore.string/releases
[ghp]: https://github.com/epeli/underscore.string/tree/gh-pages
