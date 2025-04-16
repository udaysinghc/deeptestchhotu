const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const config = require('../../config/config');

class BrowserType extends World {
  async init() {
    this.browser = await chromium.launch({
      headless: config.browser.headless,
      slowMo: config.browser.slowMo
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      timeout: config.browser.timeout
    });
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser?.close();
  }
}

setWorldConstructor(BrowserType);