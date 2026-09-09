// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // Maximum time one test can run for => timeout 
  /** Default Timeout are 
  * 1. Test Timeout - This means this is overall time, the test will execute(after that, the test will fail)
  * 2. Expect Timeout - This means this is assertion time, the test will wait for assertion untill this time(after that, the test will fail)
  */

  /**
  * There are few more timeout
  * 1. Action Timeout - all actions (click, check, fill) - all these will respect the action timeout config (if doesn't appear in 10sec, then it will fail)
  *   a. If we don't have the action timeout specified, then the Test Timeout will be considered for overall test execution timeout
  * 2. Navigation Timeout - 
  */
  // Maximum time one test can run for => timeout 
  timeout: 40 * 1000, //40secs
  expect: {
    timeout: 10 * 1000, //10secs
  },
  reporter: "html",
  projects: [
    {
      name: "SafariExecution",
      use: {
        browserName: "webkit",
        headless: true,
        actionTimeout: 10 * 1000, //10secs
        navigationTimeout: 30 * 1000, //30secs
        screenshot: "on",
        // trace: "on", // if trace is on, then for every test case irrespective of pass or fail a zip will be generated
        trace: "retain-on-failure", // saves the memory in the system as the trace is collected only on the failure case
        ...devices['iPhone 11'], // we can use this property to run the test in a particular device as well
        viewport: {
          width: 720,
          height: 720
        }, // we can use this property to run the test in a particular view port
        ignoreHTTPSErrors: true, // if the appliction url is not ssl friendly(means if the domain is not secure, but still we need to accept the condition and continue validation, playwright does it for us)
        permissions: ["geolocation"], // allows the apllication to know the current location of the user(with this property, playwright automatically allows applivation to know our location)
        video: "retain-on-failure", // takes the video if the failure is retained on multiple failures
      },
    },
    {
      name: "ChromeExecution",
      use: {
        browserName: "chromium",
        headless: true,
        actionTimeout: 10 * 1000, //10secs
        navigationTimeout: 30 * 1000, //30secs
        screenshot: "only-on-failure",
        // trace: "on", // if trace is on, then for every test case irrespective of pass or fail a zip will be generated
        trace: "retain-on-failure" // saves the memory in the system as the trace is collected only on the failure case
      },
    },
  ]
});

