import { expect, test } from "@playwright/test";

const email = "shree7@rsa.com";
const password = "Shreersa@7"

test("Security Test Request Intercept", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client")
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").pressSequentially(password);
    await page.getByRole("button", { name: "Login" }).click()
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()

    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForTimeout(5_000)

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        // continue => to intercept request calls
        route => route.continue({
            "url": "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a93f0a521054ba465fd7211bq"
        })
    )
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order") 
    await page.pause()
})