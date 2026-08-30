import { test, request, expect } from "@playwright/test";
import { Api_Utils } from "./utils/api-utils";

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

const fakePayloadOrders = {
    data: [],
    message: "No Orders"
}

let response = ""

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new Api_Utils(apiContext, loginPayloadRequest)
    response = await apiUtils.placeOrder(placeOrderData)

})

test("Web UI Automation", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()

    /**
     * * Ideal Use Case Response -
     * * 1. API will give back the response
     * * 2. That response we will send it to browser
     * * 3. Using that data, browser will render the data on UI (front-end)
     * */

    /**
     * * Interception Response
     * * 1. API will give back the response
     * * 2. Before the response is sent to browser (we have to hijack the response and insert a fake response)
     * * 3. That Fake response is sent to the browser
     * * 4. Using that data, browser will render the data on the UI (front-end)
     * * intersecpting response => api response -> {playwright faker response} -> browser -> render data on the frontend
     */

    // "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a915c0521054ba465f9b1c7"
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a915c0521054ba465f9b1c7", async route => {
        // intersecpting response => api response -> {playwright faker response} -> browser -> render data on the frontend
        const realResponse = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayloadOrders)
        route.fulfill({
            response, body
        })
    })

    await page.waitForTimeout(5_000)

    //Order has been placed through API, So we can verify if that is displayed in Orders page
    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a915c0521054ba465f9b1c7")

    console.log(await page.locator(".mt-4").textContent())


})
