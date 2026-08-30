const { expect } = require('@playwright/test');

class Api_Utils {

    constructor(apiContext, loginPayloadRequest) {
        this.apiContext = apiContext
        this.loginPayload = loginPayloadRequest
    }

    async login_and_getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        })
        console.log(loginResponse.ok());
        await expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson = await loginResponse.json()
        const user_access_token = loginResponseJson.token
        console.log("user_access_token = ", user_access_token);

        return user_access_token
    }

    async placeOrder(order_playload) {

        let final_response = {}
        const token = await this.login_and_getToken()
        final_response.token = token

        const placeOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: order_playload,
            headers: {
                "Authorization": token,
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

        const orderIdFromAPI = await placeOrderResponseJson.orders[0]
        console.log("orderIdFromAPI :", orderIdFromAPI);

        final_response.orderId = orderIdFromAPI

        return final_response
    }
}

module.exports = { Api_Utils }