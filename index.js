const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const writeData = require('./helpers/write-data');
const prepareIssues = require('./helpers/prepare-issues');
const config = require('./config');
const writeToCsv = require('./helpers/result-to-csv');

const date = new Date().toISOString().slice(0, 16).replace(/\D/g,'')


let axeTest = async () => {
  const browser = await puppeteer.launch({
    args: [`--window-size=${config.viewport.width},${config.viewport.height}`],
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page._client.send('Emulation.clearDeviceMetricsOverride');

  // await page.goto(config.testUrl);
  await page.goto(config.testUrl, {
    waitUntil: 'networkidle0',
  });

  let results;
  // TO DO: add validation
  results = await new AxePuppeteer(page)
    .options(config.axeConfig)
    .analyze();

  await page.close();
  await browser.close();
  return results;
}

axeTest().then((data) => {
  const axeResults = data
  writeData(JSON.stringify(axeResults), `${config.fileName}_${date}`, 'json');
  if (data.violations.length) {
      const resultsArray = prepareIssues(data.violations)
      writeToCsv(resultsArray, `${config.fileName}_${date}`)
  } else {
      console.log('No violation found');
  }
}).catch((err) => {
  console.log(err);
})
