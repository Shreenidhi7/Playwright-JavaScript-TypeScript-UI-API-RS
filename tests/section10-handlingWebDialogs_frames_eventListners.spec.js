import { expect, test } from "@playwright/test";

test("Handle Web Dialogs/Popups, Frames and Event Listners", async ({ page }) => {

    //First Page
    // await page.goto("https://www.google.com/")

    //Second Page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    //Go back to First Page
    // await page.goBack()

    //Go back to Second Page
    // await page.goForward()

    const hide_show_textbox_visibiltycheck_true = await page.getByPlaceholder("Hide/Show Example").isVisible()
    console.log("hide_show_textbox_visibiltycheck_true :", hide_show_textbox_visibiltycheck_true);
    await expect(hide_show_textbox_visibiltycheck_true).toBeTruthy()

    // Click on the Hide button
    await page.locator("//input[@id='hide-textbox']").click()

    const hide_show_textbox_visibiltycheck_false = await page.getByPlaceholder("Hide/Show Example").isHidden()
    console.log("hide_show_textbox_visibiltycheck_false :", hide_show_textbox_visibiltycheck_false);
    await expect(hide_show_textbox_visibiltycheck_false).toBeTruthy()

    //If we encounter the event with dialog/popup - we need to use page.on("dialog")
    // accepting the dialog pop-up
    await page.on("dialog", dialog => {
        dialog.accept()
    })
    // //cancelling the dialog pop-up
    // await page.on("dialog", dialog => {
    //     dialog.dismiss()
    // })

    //trigerring the alert/dialog/popup box
    await page.locator("//input[@id='confirmbtn']").click()

    // await page.pause()
    //Hovering on the button
    await page.locator("//button[@id='mousehover']").hover()
    await page.getByRole("link", {
        name: "Top"
    }).click()
    const browserUrl = await page.url()
    console.log("browserUrl :", browserUrl);
    expect(browserUrl).toContain("top")

    //Frames -> IFrame
    // By default, the page will have hold on all the dom elements on the current page
    // But if there are frames that are included in the current page, then the current page context will have no access to it.
    // Inorder to access the elements from the Frame, 1st we have to switch to the frame and then we have to access the elements from it.
    // Frame => Simple explaination => In page inside a page.
    const framePage = page.frameLocator("#courses-iframe")
    //there are 2 elements found, but one is visible and one is not.
    //so we provide :visible, playwright will focus only on the visible locator
    await framePage.locator(" li a[href*='lifetime-access']:visible").click()
    const textCheck = await framePage.locator("//div[@class='text']//h2").textContent()
    const stringarray = await textCheck.split(" ")
    console.log("subscribers count - ", stringarray[1]);

})