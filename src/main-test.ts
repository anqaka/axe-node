import * as path from 'path';
import { AuditObj } from './types/basic-objs.type';
import { InitConfig, FinalConfig } from './types/configs.type';
import { axeTest, getConfig, prepareIssues, writeData, configure } from './helpers';
// import { writeToCsv } from './helpers';

export default async function (customConfig: InitConfig): Promise<AuditObj> {
  const config: FinalConfig = getConfig(customConfig);
  const date = new Date().toISOString().slice(0, 16).replace(/\D/g, '');
  const resultsFile = path.join(process.cwd(), `${config.resultsDir}/${config.fileName}_${date}`);

  let auditObj: AuditObj = {} as AuditObj;
  let violationsArray: any[] = [];

  // create results directory if doesn't exist
  configure(config);

  try {
    const urlsArray = config.pages;

    if (urlsArray.length) {
      // test all pages and get axe results
      const responses = await Promise.all(
        urlsArray.map(async (item, index) => ({
          item,
          response: await axeTest(item, config, index),
        })),
      );

      // process axe results and save them to json files - each step
      responses.forEach(({ item, response }, index) => {
        writeData(JSON.stringify(response), `${resultsFile}-${index}`, 'json');

        if (response.violations) {
          violationsArray.push(...prepareIssues(response.violations, item));
        }
      });

      if (violationsArray.length) {
        // writeToCsv(violationsArray, resultsFile)
        writeData(JSON.stringify(violationsArray), `${resultsFile}-final`, 'json');
      }

      auditObj = {
        title: config.title,
        violations: violationsArray,
        violationsNo: violationsArray.length,
      };

      console.log(`
        Audit ${auditObj.title} completed.
        Reported ${auditObj.violationsNo} issues.
        See the results.
      `);
    } else {
      throw new Error('No urls provided :(');
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    return auditObj;
  }
}
