// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

/**
 * To run this configuration file in the terminal
 * - command => npx playwright test --config=playwright.config_additional.js
 * - command => npx playwright test section17-pageObjectPattern-datadrivenparameterization.spec.js --config=playwright.config_additional.js --project=SafariExecution
 */

/**
 * To run the test cases based on the tags
 * - command => npx playwright test --grep @Web
 * - command => npx playwright test --grep @API
 */
export default defineConfig({
  testDir: './tests',
  // Maximum number of retries for failed test cases
  // In in test execution result, the test case which passed after retrying will display under the tab called "Flaky"
  // - Even though it passed in 2nd attempt, it doesn't fall under the category of passed, but will fall under the category of flaky
  retries: 2,
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
  //By default, the test files will trigger for parallel execution
  // Individual tests in the fill will run in sequence
  // By default 5 workers will start running at a time, if we want to control the parallel execution, we can do it with help of workers
  workers: 2,
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

