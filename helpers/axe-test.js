
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const config = require('./../config');

const axeTest = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: [`--window-size=${config.viewport.width},${config.viewport.height}`],
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page._client.send('Emulation.clearDeviceMetricsOverride');

    if (config.basicAuth !== null) {
      await page.authenticate({
        'username': config.basicAuth.username,
        'password':config.basicAuth.pass
      })
    }

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 0
    });

    let results;
    // TO DO: add validation
    results = await new AxePuppeteer(page)
      .options(config.axeConfig)
      .analyze();

    await page.close();
    await browser.close();
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = axeTest
