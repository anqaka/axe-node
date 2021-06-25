import { InitConfig } from './types/init-config.type';
import { FinalConfig } from './types/final-config.type';
import * as path from 'path';
import axeTest from './helpers/axe-test';
import getConfig from './helpers/get-config';
import prepareIssues from './helpers/prepare-issues';
import writeData from './helpers/write-data';
import { AuditObj } from 'types/audit-obj.type';
// const writeToCsv    = require('./helpers/result-to-csv');
type testArrayRes = Promise<any> | AuditObj | string;

const mainTest = (customConfig:InitConfig): testArrayRes => {
  console.log('Hi my favorites accessibility freaks! XD');
  const date = new Date().toISOString().slice(0, 16).replace(/\D/g, '');
  const config:FinalConfig = getConfig(customConfig);
  console.log(config);
  const resultsFile = path.join(process.cwd(), `${config.resultsDir}/${config.fileName}_${date}`);
  let violationsArray:any[] = [];
  let auditObj:AuditObj;

  const testSinglePage = async (url:string) => {
    try {
      const axeResponse = await axeTest(url, config);
      // write resposne to file (temporary)
      writeData(JSON.stringify(axeResponse), resultsFile, 'json');
      const issueArray = await prepareIssues(axeResponse, url);
      violationsArray = [...violationsArray, ...issueArray];
      return violationsArray;
    } catch (error:any) {
      throw new Error(error);
    }
  };


  async function testArray(urlsArray:any[]): Promise<any> {
    try {
      if (urlsArray.length) {
        console.log("Let' start testing...");
        await Promise.all(
          urlsArray.map(async (item) => {
            await testSinglePage(item);
          }),
        );
        if (violationsArray.length) {
          // writeToCsv(violationsArray, resultsFile)
          writeData(JSON.stringify(violationsArray), `${resultsFile}-all`, 'json');
        }
        auditObj = {
          title: config.title,
          violationsNo: violationsArray.length,
          violations: violationsArray
        }
      } else {
        console.error('No urls provided :(');
      }

      return auditObj
    } catch (error:any) {
      throw new Error(error);
    }
  }
  return testArray(config.pages);
};

export default mainTest;
