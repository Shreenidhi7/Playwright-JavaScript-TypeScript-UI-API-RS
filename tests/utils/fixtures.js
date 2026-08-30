const { test: base, request } = require("@playwright/test");
const { Api_Utils } = require("./api-utils");

const email = process.env.TEST_EMAIL || "shree7@rsa.com";
const password = process.env.TEST_PASSWORD || "Shreersa@7";

const loginPayloadRequest = {
    userEmail: "shree7@rsa.com",
    userPassword: "Shreersa@7"
}

const placeOrderData = {
    "orders": [{
        "country": "India",
        "productOrderedId": "6960eac0c941646b7a8b3e68"
    }]
}

exports.customtest = base.extend({
    
    authenticatedPage: async ({ page }, use) => {
        // const context = await browser.newContext();
        // const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").pressSequentially(password);
        await page.getByRole("button", { name: "Login" }).click();
        await page.waitForLoadState("networkidle");
        await page.locator(".card .card-body").first().waitFor();
        await use(page);
        //teardown
        await page.close()
    },

    createOrder: async ({ }, use) => {
        const apiContext = await request.newContext();
        const apiUtils = new Api_Utils(apiContext, loginPayloadRequest)
        const response = await apiUtils.placeOrder(placeOrderData)
        await use(response)
        //teardown
        await apiContext.dispose()
    },

    testDataForOrder: {
        productName: "ZARA COAT 3"
    }

});


