import * as path from 'path';
import * as  fs from 'fs';
import getConfig from'./helpers/get-config';
import { InitConfig } from 'axe-node/src/types/init-config.type';
import { FinalConfig } from 'axe-node/src/types/final-config.type';

function configure (customConfig:InitConfig) {
  const config:FinalConfig = getConfig(customConfig);
  const resultsDirectory:string = path.join(process.cwd(), config.resultsDir);
  if (!fs.existsSync(resultsDirectory)) {
    fs.mkdirSync(resultsDirectory);
  }
  console.log(`Configuration completed, ${config.resultsDir} created. You will find the results there. Enjoy!`)
};

export { configure as axeConfigure }
