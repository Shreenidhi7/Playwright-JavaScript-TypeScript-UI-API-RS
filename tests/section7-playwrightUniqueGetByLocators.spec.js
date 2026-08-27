import { expect, test } from "@playwright/test";

// As defined in the config page ->  timeout: 40 * 1000,
// It means that we should complete the execution of the test/test case by 40 secs (as defined in the config)
// If we need to set the timout for the test at the test level, then we need to do it inside the test
// // test.setTimeout(60000) => We have set it for 60 secs here in the test case level

test("Playwright's Unique Get By Locators", async ({ page }) => {

    //Customization of timeout at the test case level
    test.setTimeout(60000)
    // wait.For() => This will also wait for 60secs

    //Customization of expect at the test case level
    const slowExpect = expect.configure({
        timeout: 12_000,
    })

    //Customization of Action timeout ar the test case level
    page.setDefaultTimeout(18_000)

    //Customization of Navigation timeout at the test case level
    page.setDefaultNavigationTimeout(45_000)

    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    // //Name
    // await page.getByRole("textbox", { name: "name" }).fill("Shree")

    // //Email
    // await page.getByRole("textbox", { name: "email" }).fill("shree@nidhi.com")

    //Password
    await page.getByPlaceholder("Password").fill("Shreenidhi")

    //Checbox
    await page.getByLabel("Check me out if you Love IceCreams!").click()

    //Gender
    await page.getByRole("combobox").selectOption("Male")

    //DOB

    //Submit Button
    await page.getByRole("button", { name: "Submit" }).click()

    //Success Message
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    // By default - its 5seconds wait(timeout) for expect assertions
    // By if we want to override in the step level
    // If we want to set the timeout for expect globally, we need to do it in config file => expect: { timeout: 10 * 1000},
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({
        timeout: 10_000
    })

    //ShopPage Link
    // await page.getByAltText("Shop").click()
    // Step level action timeout could also be custom
    await page.getByRole("link", { name: "shop" }).click({
        timeout: 15_000
    })

    // Shop Name
    await slowExpect(await page.locator(".my-4").first()).toHaveText("Shop Name")

    //List of Cards
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click()

    // Global -> Test -> Step

})

test.only("End2End Web Automation Scenario", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client")
    const email = "anshika@gmail.com";
    const password = "Iamking@000"
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").pressSequentially(password);
    await page.getByRole("button", { name: "Login" }).click()
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()

    // // List out all the cards and its titles
    // const cart_products = await page.locator(".card .card-body")
    // const cardTitlesTexts = await cart_products.allTextContents()
    // // console.log("cardTitlesTexts", cardTitlesTexts);

    // //Select a particular card/product from the table - Zara Coat 3
    // const productNameRequired = "ZARA COAT 3"
    // const totalCount = await cart_products.count()
    // console.log("totalCount", totalCount);

    // for (let i = 0; i < totalCount; i++) {
    //     const cart_product_name = await cart_products.nth(i).locator("b").textContent()
    //     console.log("cart_product_name =", cart_product_name);
    //     if (await cart_product_name == await productNameRequired) {
    //         await cart_products.nth(i).locator("//button[@class='btn w-10 rounded']").click()
    //         break
    //     }
    // }

    await page.locator(".card-body").filter({
        hasText: "ZARA COAT 3"
    }).getByRole("button", { name: "Add to Cart" }).click()

    // Wait for Toastify message to diasplay and asset
    await page.waitForSelector("[aria-label$='Product Added To Cart']")
    const success_message_toastify = await page.locator("[aria-label$='Product Added To Cart']")
    expect(success_message_toastify).toBeVisible()

    // Click on Cart button (top nav menu)
    // await page.locator("[routerlink*='cart']").click()
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click()

    // Wait for items to load
    await page.waitForLoadState('networkidle')
    await page.locator(".cart .cartWrap.ng-star-inserted .infoWrap").waitFor()

    // Get the required cart item and assert
    // const listOfCartPorducts = await page.locator(".cart .cartWrap.ng-star-inserted .infoWrap")
    // console.log(await listOfCartPorducts.allTextContents());
    // const isSelectedItemVisible = await listOfCartPorducts.locator("h3:has-text('ZARA COAT 3')").isVisible()
    // console.log("isSelectedItemVisible", isSelectedItemVisible)
    // expect(isSelectedItemVisible).toBeTruthy()
    await expect(page.getByText("ZARA COAT 3")).toBeVisible()

    //Click on the checkout button
    // await page.locator("text=Checkout").click()
    await page.getByRole("button", {name: "Checkout"}).click()

    // Static Dropdown
    //Expiry Month and Date
    const monthDropdown = await page.locator("//select[@class='input ddl'][1]")
    await monthDropdown.selectOption("08")
    await page.locator("//select[@class='input ddl'][2]").selectOption("27")
    await page.waitForTimeout(5_000)

    // Dynamic Dropdown
    // await page.locator("[placeholder='Select Country']").pressSequentially("Ind", {
    //     delay: 150 //milliseconds
    // })
    // const country_options = await page.locator(".ta-results")
    // await country_options.waitFor()
    // const totalCountriesCount = await country_options.locator("button").count()
    // for (let i = 0; i < totalCountriesCount; i++) {
    //     const countryname = await country_options.locator("button").nth(i).textContent()
    //     if (countryname.trim() === "India" || countryname.includes("India")) {
    //         await country_options.locator("button").nth(i).click()
    //         break
    //     }
    // }
    await page.getByPlaceholder("Select Country").pressSequentially("Ind")
    await page.getByRole("button", {name: "India"}).nth(1).click()

    //Assertions
    const username_field_heading = await page.locator("//div[@class='user__name mt-5']//label").textContent()
    console.log("username_field_heading", username_field_heading)
    const username_field_textbox = await page.locator("//div[@class='user__name mt-5']//input[@type='text']").inputValue()
    console.log(username_field_textbox, username_field_textbox);
    await expect(username_field_heading).toEqual(email)
    await expect(username_field_textbox).toEqual(email)
    await expect(username_field_heading).toEqual(username_field_textbox)

    //Apply coupon
    await page.locator("//input[@name='coupon']").fill("rahulshettyacademy")
    await page.getByRole("button", {
        name: "Apply Coupon"
    }).click()
    await page.waitForSelector(".mt-1.ng-star-inserted")
    const coupon_application_confirmation = await page.locator(".mt-1.ng-star-inserted")
    expect(coupon_application_confirmation).toBeVisible()

    //Place Order
    // await page.locator(".action_submit").click()
    await page.getByText("PLACE ORDER").click()

    //Verify Text
    // locator("h3:has-text('ZARA COAT 3')
    // const order_confirmation_text = await page.locator(".hero-primary").textContent()
    // console.log("order_confirmation_text", order_confirmation_text);
    // await expect(order_confirmation_text).toContain("Thank you")
    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);
    await expect(page.getByText("Thankyou for the order.")).toBeVisible()


})