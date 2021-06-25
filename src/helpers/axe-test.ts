import { ResponseObj } from 'types/response-obj.type';

const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const axeTest = async (url: string, axeConfig) => {
  try {
    const browser = await puppeteer.launch({
      args: [`--window-size=${axeConfig.viewport.width},${axeConfig.viewport.height}`],
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page._client.send('Emulation.clearDeviceMetricsOverride');

    if (axeConfig.basicAuth !== null) {
      await page.authenticate({
        username: axeConfig.basicAuth.username,
        password: axeConfig.basicAuth.pass,
      });
    }

    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 0,
    });

    let results:ResponseObj;
    // TO DO: add validation
    results = await new AxePuppeteer(page).options(axeConfig.axeConfig).analyze();

    await page.close();
    await browser.close();
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default axeTest;
