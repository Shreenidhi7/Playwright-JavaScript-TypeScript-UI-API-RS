import { expect, test } from "@playwright/test";

test("Browser Context Playwright Test", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")
})

test("Page Playwright Test", async ({ page }) => {
    // If we don't have any particular browser context or page, then we can directly start form page fixture
    // const context = await browser.newContext()
    // const page = context.newPage()
    await page.goto("https://google.com/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    await expect(page).toHaveTitle("Google")
})

test("Rahul Shetty Login Page Test - Failure and Error Msg Validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")
    await page.locator("input#username").fill("rahulshetty")
    await page.locator("[name='password']").fill("Learning@830$3mK2")
    await page.locator("#signInBtn").click()
    const error_message = await page.locator("[style*='block']").textContent()
    console.log("error_message", error_message);
    await expect(error_message).toContain("Incorrect")
})

test("Rahul Shetty Login Page to Dashboard", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")
    //clearing the vlaue
    const usernameLocator = page.locator("input#username")
    const userpasswordLocator = page.locator("[name='password']")
    const userSignInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body .card-title a")

    await usernameLocator.fill("")
    await userpasswordLocator.fill("")
    await usernameLocator.fill("rahulshettyacademy")
    await userpasswordLocator.fill("Learning@830$3mK2")
    await userSignInBtn.click()

    // const firstCardTitle = await cardTitles.first().textContent()
    // const secondCardTitle = await cardTitles.nth(1).textContent()
    // If we comment out the above 2 lines, the allTextContents() will return empty array
    // This is because, the elements are shown up when the allTextContents are pulled(this is mentioned in auto-wait playwright documentation)
    const allTitles = await cardTitles.allTextContents()
    console.log("allTitle", allTitles);
})

test("@Web Client App login", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client")
    const email = "anshika@gmail.com";
    const password = "Iamking@000"
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").pressSequentially(password);
    await page.locator("[id='login']").click()

    const cardItems = await page.locator(".card-body b")
    // const firstCardItem = await cardItems.first().textContent()
    // const secondCardItem = await cardItems.nth(1).textContent()
    await page.waitForLoadState('networkidle');
    // await cardItems.first().waitFor(); alternative
    const allCardItems = await cardItems.allTextContents()
    console.log("All Card Items", allCardItems);

})