# Axe node

Simple node app to run accessibility tests with [axe-core](https://github.com/dequelabs/axe-core) and [@axe-core/puppeteer](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/puppeteer/README.md)

## Installation

Install dependencies using `yarn` command.

## COnfiguration

1. Run `yarn axe:configure` command - it will create `resultsDir` (by default `axe-results`) and custom config file - `axe.config.json` in root of your working directory
2. Provide urls to `pages` array in your custom config files or pass urls using command line arguments.


`resultsDir` is required to save tests results.
If you change `resultsDor` value in config file, run `yarn axe:configure` to create a directory.
## Usage

create `axe.config.json` in your and add options:
required options:
list of urls to test

Create `axe.config.json` in your module.
add urls which you want to test in `pages` array and use available options to overwrite defaults.

Start testing:
```
yarn axe:test
```
## Options
### Defaults options

```json
{
  "pages": [],
  "fileName": "tested-file",
  "resultsDir": "axe-results",
  "basicAuth": null,
  "axeConfig": {
    "reporter": "v2"
  },
  "viewport": {
    "width": "1920",
    "height": "1080"
  }
}
```

### Basic auth configuration

```js
basicAuth: {
  username: 'some username',
  password: 'some passworg'
}
```

### Command line options

1. Pages comma separated using command line:

`--pages="https://google.com/,https://github.com/"`

2. Custom config file path:
`--config="axe.json"`

path is relative to your working directory and is in `json` format.

Config hierarchy:
- command line
- custom config
- default config

Configs objects are merged.


The project is WIP
