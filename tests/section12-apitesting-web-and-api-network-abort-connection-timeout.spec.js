import { test, expect, request } from "@playwright/test";
import { url } from "node:inspector";

test("Network Abort/Block Certain Things in a Page", async ({ browser }) => {

    const browserContext = await browser.newContext()
    const page = await browser.newPage()

    // with the below blocking of the css loading, we can how the ui looks like
    page.route("**/*.css", route => route.abort())
    page.on("request", request => console.log("request url ", request.url()))
    page.on("response", response => console.log("response url", response.url(), "response status code", response.status()))

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")

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

    await page.route("**/*.{jpg,png,jpeg}", route => route.abort())
    await page.waitForTimeout(5_000)


})