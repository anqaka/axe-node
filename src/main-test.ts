import * as path from 'path';
import { InitConfig } from './types/init-config.type';
import { FinalConfig } from './types/final-config.type';
import { ResponseObj } from './types/response-obj.type';
import { AuditObj } from './types/audit-obj.type';
import axeTest from './helpers/axe-test';
import getConfig from './helpers/get-config';
import prepareIssues from './helpers/prepare-issues';
import writeData from './helpers/write-data';
// const writeToCsv    = require('./helpers/result-to-csv');
type testArrayRes = Promise<any> | AuditObj | string;

const mainTest = (customConfig: InitConfig): testArrayRes => {
  console.log('Hi my favorites accessibility freaks! XD');
  // set date
  const date = new Date().toISOString().slice(0, 16).replace(/\D/g, '');
  // get config
  const config: FinalConfig = getConfig(customConfig);
  console.log(config);

  const resultsFile = path.join(process.cwd(), `${config.resultsDir}/${config.fileName}_${date}`);
  let violationsArray: any[] = [];
  let auditObj: AuditObj;
  // check if results dir exits TODO

  const testSinglePage = async (url: string, index: number) => {
    try {
      const axeResponse: ResponseObj = await axeTest(url, config, index);
      // write resposne to fils
      writeData(JSON.stringify(axeResponse), `${resultsFile}-${index}`, 'json');
      if (axeResponse.violations) {
        const issueArray: any[] = await prepareIssues(axeResponse.violations, url);
        violationsArray = [...violationsArray, ...issueArray];
      } else {
        console.log('there is no violation on the website');
        return [];
      }
      return violationsArray;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  async function testArray(urlsArray: any[]): Promise<any> {
    try {
      if (urlsArray.length) {
        console.log("Let' start testing...");
        await Promise.all(
          urlsArray.map(async (item, index) => {
            await testSinglePage(item, index);
          }),
        );
        if (violationsArray.length) {
          // writeToCsv(violationsArray, resultsFile)
          writeData(JSON.stringify(violationsArray), `${resultsFile}-final`, 'json');
        }
        auditObj = {
          title: config.title,
          violationsNo: violationsArray.length,
          violations: violationsArray,
        };
      } else {
        console.error('No urls provided :(');
      }
      console.log(`Audit ${auditObj.title} completed. Reported ${auditObj.violationsNo} issues. See the results.`);
      return auditObj;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  return testArray(config.pages);
};

export default mainTest;
