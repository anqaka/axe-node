const path          = require('path');
const axeTest       = require('./helpers/axe-test');
const getConfig     = require('./helpers/get-config');
const prepareIssues = require('./helpers/prepare-issues');
const writeData     = require('./helpers/write-data');
// const writeToCsv    = require('./helpers/result-to-csv');

const test = () => {
  const date = new Date().toISOString().slice(0, 16).replace(/\D/g,'');
  const config = getConfig();
  const resultsFile = path.join(process.cwd(), `${config.resultsDir}/${config.fileName}_${date}`);
  let finalResults = [];

  const testSinglePage  = async (url) => {
    try {
      const axeResponse = await axeTest(url);
      // write resposne to file (temporary)
      writeData(JSON.stringify(axeResponse), `${resultsFile}-all`, 'json');
      const issueArray = await prepareIssues(axeResponse, url);
      finalResults = [...finalResults, ...issueArray];
      return finalResults;
    } catch (error) {
      throw new Error(error)
    }
  }

  async function testArray(urlsArray) {
    try {
      if (urlsArray.length) {
        console.log('Let\' start testing...');
        await Promise.all(urlsArray.map(async (item) => {
          await testSinglePage(item);
        }))
        if (finalResults.length) {
          // writeToCsv(finalResults, resultsFile)
          writeData(JSON.stringify(finalResults), resultsFile, 'json')
        }
      } else {
        console.error('No urls provided :\(');
      }
    } catch (error) {
      throw new Error(error);
    }

  }
  testArray(config.pages);
}

module.exports = test();
