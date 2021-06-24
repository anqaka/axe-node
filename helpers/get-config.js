const parseArgs = require('minimist');
const objectFromPath = require('./object-from-path');
const defaultConfig = require('../config');

const getConfig = () => {
  // arguments from command line
  const args = parseArgs(process.argv.slice(2));
  // set path to the config file
  let clConfig = {};
  if (args.config) {
    clConfig = { ...objectFromPath(args.config) }
  }
  if (args.pages) {
    clConfig.pages = args.pages.split(',');
  }

  // custom config from file 'axe.config.json'
  const customConfig = objectFromPath('axe.config.json');
  const config = Object.assign(
    {},
    defaultConfig,
    customConfig,
    clConfig
  );
  return config;
}

module.exports = getConfig;
