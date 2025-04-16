const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');

// Ensure the reports directory exists
BeforeAll(async function () {
  try {
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    // Ensure we have write permissions
    fs.accessSync('reports', fs.constants.W_OK);
  } catch (error) {
    console.error('Error creating/accessing reports directory:', error);
    throw error;
  }
});

// Initialize the browser before each scenario
Before(async function () {
  await this.init();
});

// Cleanup after each scenario
After(async function ({ result }) {
  // Take screenshot if scenario fails
  if (result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({
      path: `reports/failure-${Date.now()}.png`,
      fullPage: true
    });
    await this.attach(screenshot, 'image/png');
  }
  await this.cleanup();
});