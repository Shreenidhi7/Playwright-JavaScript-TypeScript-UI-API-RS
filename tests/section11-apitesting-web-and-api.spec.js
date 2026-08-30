import { test, request, expect } from "@playwright/test";

const loginPayloadRequest = {
    userEmail: "shree7@rsa.com",
    userPassword: "Shreersa@7"
}
let user_access_token = ""

const placeOrderData = {
    "orders": [{
        "country": "India",
        "productOrderedId": "6960eac0c941646b7a8b3e68"
    }]
}
let orderIdFromAPI = ""

test.beforeAll(async () => {

    // Login API 
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayloadRequest,
    })
    console.log(loginResponse.ok());
    await expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson = await loginResponse.json()
    user_access_token = loginResponseJson.token
    console.log("user_access_token = ", user_access_token);

    // Place Order API
    const placeOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: placeOrderData,
        headers: {
            "Authorization": user_access_token,
            "Content-Type": "application/json"
        }
    })
    const statusResponse = await placeOrderResponse.status()
    console.log("statusResponse : ", statusResponse);
    await expect(statusResponse).toBe(201)

    const statusResponseStatus = await placeOrderResponse.statusText()
    console.log("statusResponseStatus : ", statusResponseStatus);
    await expect(statusResponseStatus).toContain("Created")

    const placeOrderResponseJson = await placeOrderResponse.json()
    console.log("placeOrderResponseJson :", placeOrderResponseJson);

    orderIdFromAPI = await placeOrderResponseJson.orders[0]
    console.log("orderIdFromAPI :", orderIdFromAPI);



})

test("Web UI Automation", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, user_access_token)
    await page.goto("https://rahulshettyacademy.com/client")
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()

    await page.locator(".card-body").filter({
        hasText: "ZARA COAT 3"
    }).getByRole("button", { name: "Add to Cart" }).click()

    // Wait for Toastify message to diasplay and asset
    await page.waitForSelector("[aria-label$='Product Added To Cart']")
    const success_message_toastify = await page.locator("[aria-label$='Product Added To Cart']")
    expect(success_message_toastify).toBeVisible()

    //Order has been placed through API, So we can verify if that is displayed in Orders page
    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForTimeout(5_000)

    //Verify the Order is the same from API to UI
    // We have captured the order form the API, we need to verify the same in the UI
    // const orderIdFromUI = await page.locator("tbody .ng-star-inserted th").textContent()
    // console.log("orderIdFromUI", orderIdFromUI);

    // await expect(orderIdFromAPI).toEqual(orderIdFromUI)
    // await page.waitForTimeout(5_000)

    const orderIdFromUI = await page.locator("tbody th")
    const listOfOrders = await orderIdFromUI.allTextContents()
    console.log("listOfOrders", await listOfOrders);

    const totalOrderCount = await orderIdFromUI.count()

    for (let i = 0; i < totalOrderCount; i++) {
        console.log(i);
        let orderId = await listOfOrders[i]
        console.log("orderId", orderId);

        if (orderId === orderIdFromAPI) {
            console.log("The current order id matches" + orderId + " and " + orderIdFromAPI + " ");
            break
        }
    }
    await page.waitForTimeout(5_000)


})