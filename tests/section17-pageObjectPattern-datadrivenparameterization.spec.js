import { test, expect } from "@playwright/test"
import { LoginPage } from "../pageobjects/loginPage"
import { DashboardPage } from "../pageobjects/dashboardPage"

test("PageObjectModel - End2End Web Automation Scenario", async ({ page }) => {

    const loginPage = new LoginPage(page)
    const dashboardPage = new DashboardPage(page)
    const email = "shree7@rsa.com";
    const password = "Shreersa@7"
    await loginPage.visitUrl("https://rahulshettyacademy.com/client")
    await loginPage.userLogin(email, password)
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()
    const productNameExpected = "ZARA COAT 3"
    await dashboardPage.searchProducts(productNameExpected)
    await dashboardPage.addProductToCart()
    await dashboardPage.navigateToCart()



})