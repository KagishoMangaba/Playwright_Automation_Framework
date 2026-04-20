import dotenv from 'dotenv';

const env = process.env.ENV || 'qa';
dotenv.config({ path: `.env.${env}` });

import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
    testDir: './tests',

    timeout: ENV.TIMEOUTS.TEST,
    expect: {
        timeout: ENV.TIMEOUTS.EXPECT,
    },

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    reporter: [
        ['line'],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],

    use: {
        baseURL: ENV.BASE_URL,

        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    outputDir: 'test-results/',

    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        // { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    ],
});