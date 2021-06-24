import { InitConfig } from './types/init-config.type';
import { FinalConfig } from './types/final-config.type';
import * as path from 'path';
import axeTest from './helpers/axe-test';
import getConfig from './helpers/get-config';
import prepareIssues from './helpers/prepare-issues';
import writeData from './helpers/write-data';
// const writeToCsv    = require('./helpers/result-to-csv');

const mainTest = (customConfig:InitConfig):Promise<any[]> | [] => {
  console.log('Hi my favorites accessibility freaks! XD');
  const date = new Date().toISOString().slice(0, 16).replace(/\D/g, '');
  const config:FinalConfig = getConfig(customConfig);
  console.log(config);
  const resultsFile = path.join(process.cwd(), `${config.resultsDir}/${config.fileName}_${date}`);
  let finalResults:any[] = [];

  const testSinglePage = async (url:string) => {
    try {
      const axeResponse = await axeTest(url, config);
      // write resposne to file (temporary)
      writeData(JSON.stringify(axeResponse), `${resultsFile}-all`, 'json');
      const issueArray = await prepareIssues(axeResponse, url);
      finalResults = [...finalResults, ...issueArray];
      return finalResults;
    } catch (error:any) {
      throw new Error(error);
    }
  };

  async function testArray(urlsArray:any[]) {
    try {
      if (urlsArray.length) {
        console.log("Let' start testing...");
        await Promise.all(
          urlsArray.map(async (item) => {
            await testSinglePage(item);
          }),
        );
        if (finalResults.length) {
          // writeToCsv(finalResults, resultsFile)
          writeData(JSON.stringify(finalResults), resultsFile, 'json');
        }
      } else {
        console.error('No urls provided :(');
      }
      return finalResults
    } catch (error:any) {
      throw new Error(error);
    }
  }
  return testArray(config.pages);
};

export default mainTest;
