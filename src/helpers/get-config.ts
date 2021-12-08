import defaultConfig from './../config';
import { InitConfig, FinalConfig } from './../types/configs.type';

const getConfig = (customConfig: InitConfig): FinalConfig => {
  // check if pages are provided
  if (!customConfig.pages.length) {
    throw new Error('Please provide at least one url to test');
  }

  const { resultsDir: defaultResultsDir } = defaultConfig;
  const { resultsDir: customResultsDir } = customConfig;

  const config: FinalConfig = Object.assign({}, defaultConfig, customConfig);
  config.resultsDir = (customResultsDir && customResultsDir !== defaultResultsDir)
    ? `${defaultResultsDir}/${customResultsDir}`
    : defaultResultsDir;
  return config;
};

export default getConfig;
