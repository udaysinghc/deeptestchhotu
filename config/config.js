require('dotenv').config();

const config = {
    baseUrl: process.env.BASE_URL || 'https://apps.abacus.ai/chatllm/?appId=43c471cb6',
    
    // Browser configuration for local testing
    browser: {
        headless: process.env.HEADLESS !== 'false',
        slowMo: parseInt(process.env.SLOW_MO || '0'),
        timeout: parseInt(process.env.TIMEOUT || '30000')
    },

    // LambdaTest configuration
    lambdaTest: {
        username: process.env.LT_USERNAME || 'udaysingh',
        accessKey: process.env.LT_ACCESS_KEY || 'LT_7Q5gxUNfFpXe0v7hfMm5nwUX7pITO6rY66arQ2HLuAd0ENl',
        buildName: process.env.BUILD_NAME || 'Test Automation Build',
        platformName: process.env.PLATFORM_NAME || 'Windows 10',
        browserName: process.env.BROWSER_NAME || 'Chrome',
        browserVersion: process.env.BROWSER_VERSION || 'latest',
        hubUrl: 'https://hub.lambdatest.com/wd/hub',
        visual: true,
        network: true,
        console: true,
        w3c: true,
        plugin: 'node_js-mocha',
        tunnel: process.env.TUNNEL === 'true'
    },

    // Environment configuration
    environment: process.env.NODE_ENV || 'development',
    
    // Execution mode: 'local' or 'lambda'
    executionMode: process.env.EXECUTION_MODE || 'local'
};

// Helper function to check if running on LambdaTest
config.isLambdaTest = () => config.executionMode === 'lambda';

// Helper function to get browser capabilities
config.getBrowserCapabilities = () => {
    if (config.isLambdaTest()) {
        return {
            'browserName': config.lambdaTest.browserName,
            'browserVersion': config.lambdaTest.browserVersion,
            'LT:Options': {
                username: config.lambdaTest.username,
                accessKey: config.lambdaTest.accessKey,
                platformName: config.lambdaTest.platformName,
                build: config.lambdaTest.buildName,
                visual: config.lambdaTest.visual,
                network: config.lambdaTest.network,
                console: config.lambdaTest.console,
                w3c: config.lambdaTest.w3c,
                plugin: config.lambdaTest.plugin,
                tunnel: config.lambdaTest.tunnel
            }
        };
    }
    return config.browser;
};

// Helper function to get the WebDriver URL
config.getDriverUrl = () => {
    if (config.isLambdaTest()) {
        return `https://${config.lambdaTest.username}:${config.lambdaTest.accessKey}@${config.lambdaTest.hubUrl}`;
    }
    return 'http://localhost:4444/wd/hub'; // Default local Selenium server
};

module.exports = config;