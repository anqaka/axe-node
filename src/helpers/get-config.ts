import defaultConfig from '../config';
import { InitConfig } from './../types/init-config.type';
import { FinalConfig } from './../types/final-config.type';

const getConfig = (customConfig:InitConfig):FinalConfig => {

  // check if pages are provided
  if (!customConfig.pages.length) {
    throw new Error('Please provide at least one url to test')
  }
  const config:FinalConfig = Object.assign({}, defaultConfig, customConfig);
  return config;
};

export default getConfig;
