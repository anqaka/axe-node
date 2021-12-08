import * as path from 'path';
import * as fs from 'fs';
import { FinalConfig } from '../types/configs.type';

const configure = (finalConfig: FinalConfig) => {
  const resultsDirectory: string = path.join(process.cwd(), finalConfig.resultsDir);
  if (!fs.existsSync(resultsDirectory)) {
    fs.mkdirSync(resultsDirectory, { recursive: true });
  }
  console.log(`Configuration completed, ${resultsDirectory} created. You will find the results there. Enjoy!`);
}

export default configure;
