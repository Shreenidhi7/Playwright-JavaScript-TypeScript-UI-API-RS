import { expect, test } from "@playwright/test";

test("Screenshot", async ({ page }) => {

    //Second Page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")

    const hide_show_textbox_visibiltycheck_true = await page.getByPlaceholder("Hide/Show Example").isVisible()
    console.log("hide_show_textbox_visibiltycheck_true :", hide_show_textbox_visibiltycheck_true);
    await expect(hide_show_textbox_visibiltycheck_true).toBeTruthy()

    //Take Screenshot - At Locator Level
    await await page.getByPlaceholder("Hide/Show Example").screenshot({
        path: "assets/screenshots/locator-screenshot.png"
    })

    // Click on the Hide button
    await page.locator("//input[@id='hide-textbox']").click()

    //Take Sceenshot - At Page Level
    await page.screenshot({
        path: "assets/screenshots/page-screenshot.png"
    })

    const hide_show_textbox_visibiltycheck_false = await page.getByPlaceholder("Hide/Show Example").isHidden()
    console.log("hide_show_textbox_visibiltycheck_false :", hide_show_textbox_visibiltycheck_false);
    await expect(hide_show_textbox_visibiltycheck_false).toBeTruthy()

})

test("Visual Testing - Visual Comparisions - Success Scenario", async({page})=>{
    //Visual Testing - Its nothing but comparing the screenshot on every run, checking is there any changes in the file/image
    await page.goto("https://flightware.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
    // This creates a file under test folder with file name and inside it, there would be a snapshot
    // The 1st execution fails, as it would be the reference
    // The 2nd execution would compare the 1st execution result and based on comparision, the test will pass/fail accordingly
})
