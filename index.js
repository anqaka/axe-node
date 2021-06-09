const axeTest = require('./helpers/axe-test');
const config = require('./config');
const prepareIssues = require('./helpers/prepare-issues');
const writeData = require('./helpers/write-data');
const writeToCsv = require('./helpers/result-to-csv');

const date = new Date().toISOString().slice(0, 16).replace(/\D/g,'')
let finalResults = []

const testSinglePage  = async (url) => {
  const axeResponse = await axeTest(url);
  const issueArray = await prepareIssues(axeResponse, url);
  finalResults = [...finalResults, ...issueArray];
  return finalResults;
}

async function testArray(urlsArray) {

  await Promise.all(urlsArray.map(async (item) => {
    await testSinglePage(item);
  }))
  if (finalResults.length) {
    writeToCsv(finalResults, `${config.fileName}_${date}`)
    writeData(JSON.stringify(finalResults), `${config.fileName}_${date}`, 'json')
  }
}

testArray(config.pages);
