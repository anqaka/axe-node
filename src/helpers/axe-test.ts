import { Page } from './../types/page.type';
import { FinalConfig } from './../types/final-config.type';
import { ResponseObj } from './../types/response-obj.type';

import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const axeTest = async (singlePage: Page, axeConfig: FinalConfig, index: number) => {
  try {
    const browser = await puppeteer.launch({
      args: [`--window-size=${axeConfig.viewport.width},${axeConfig.viewport.height}`],
      defaultViewport: null,
      waitForInitialPage: true,
      headless: false,
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);

    if (axeConfig.basicAuth) {
      await page.authenticate({
        username: axeConfig.basicAuth.username,
        password: axeConfig.basicAuth.password,
      });
    }

    await page.goto(singlePage.url, {
      waitUntil: 'networkidle2',
      timeout: 0,
    });
    await page.screenshot({ path: `example-${index}.png` });

    let results: ResponseObj;
    // TO DO: add validation
    if (singlePage.selector) {
      results = await new AxePuppeteer(page).include(singlePage.selector).options(axeConfig.axeConfig).analyze();
    } else {
      results = await new AxePuppeteer(page).options(axeConfig.axeConfig).analyze();
    }

    await page.close();
    await browser.close();
    return results;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default axeTest;
