import { test, expect } from "@playwright/test";

test("Handle UI Components", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")

    //dropdown
    const dropdown = await page.locator("select.form-control")
    await dropdown.selectOption("consult")
    // await page.pause()
    const userRadioButton = page.locator(".radiotextsty").last()
    await userRadioButton.click()
    await page.locator("#okayBtn").click()
    const buttonIsChecked = await userRadioButton.isChecked()
    console.log("button is checked ", buttonIsChecked);
    await expect(userRadioButton).toBeChecked()

    //checkbox
    const checkbox = await page.locator("#terms")
    await checkbox.click()
    await expect(checkbox).toBeChecked()

    //uncheck
    await checkbox.uncheck()
    expect(await checkbox.isChecked()).toBeFalsy()

    //blinking text
    const documentLink = page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class", "blinkingText")

})

test.only("Handle Child Windows and Tabs by switching Browser Context", async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const pageTitle = await page.title()
    console.log("pageTitle", pageTitle);
    expect(pageTitle).toContain("Rahul Shetty")

    //blinking text
    const documentLink = page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class", "blinkingText")

    // traverse to child window/tab
    const [newPage] = await Promise.all([
        context.waitForEvent("page"), //listens for the new page // promise pending, rejected, fulfilled
        documentLink.click() //new page will be opened
    ])
    const red_text = await newPage.locator(".im-para.red").textContent()
    console.log("red_text", red_text);
    const arrayText = red_text.split("@")
    const domainName = arrayText[1].split(" ")[0]
    console.log("captured domain name", domainName);

    //move back to parent window/tab
    await page.locator("#username").fill(domainName)
    // console.log(await page.locator("#username").textContent());
    // we are programatically filling it in the run time.
    //  // textcontent will not work (it only works when it is attached to the dom when page opens)
    // // inputvalue will work after dom is opened.
    console.log("username filled", await page.locator("#username").inputValue());

})