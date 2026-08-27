import { expect, test } from "@playwright/test";

test("End2End Web Automation Scenario", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client")
    const email = "anshika@gmail.com";
    const password = "Iamking@000"
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").pressSequentially(password);
    await page.locator("[id='login']").click()
    await page.waitForLoadState("networkidle")
    await page.locator(".card .card-body").first().waitFor()

    // List out all the cards and its titles
    const cart_products = await page.locator(".card .card-body")
    const cardTitlesTexts = await cart_products.allTextContents()
    // console.log("cardTitlesTexts", cardTitlesTexts);

    //Select a particular card/product from the table - Zara Coat 3
    const productNameRequired = "ZARA COAT 3"
    const totalCount = await cart_products.count()
    console.log("totalCount", totalCount);

    for (let i = 0; i < totalCount; i++) {
        const cart_product_name = await cart_products.nth(i).locator("b").textContent()
        console.log("cart_product_name =", cart_product_name);
        if (await cart_product_name == await productNameRequired) {
            await cart_products.nth(i).locator("//button[@class='btn w-10 rounded']").click()
            break
        }
    }
    // Wait for Toastify message to diasplay and asset
    await page.waitForSelector("[aria-label$='Product Added To Cart']")
    const success_message_toastify = await page.locator("[aria-label$='Product Added To Cart']")
    expect(success_message_toastify).toBeVisible()

    // Click on Cart button (top nav menu)
    await page.locator("[routerlink*='cart']").click()

    // Wait for items to load
    await page.waitForLoadState('networkidle')
    await page.locator(".cart .cartWrap.ng-star-inserted .infoWrap").waitFor()

    // Get the required cart item and assert
    const listOfCartPorducts = await page.locator(".cart .cartWrap.ng-star-inserted .infoWrap")
    console.log(await listOfCartPorducts.allTextContents());
    const isSelectedItemVisible = await listOfCartPorducts.locator("h3:has-text('ZARA COAT 3')").isVisible()
    console.log("isSelectedItemVisible", isSelectedItemVisible)
    expect(isSelectedItemVisible).toBeTruthy()

    //Click on the checkout button
    await page.locator("text=Checkout").click()

    // Static Dropdown
    //Expiry Month and Date
    const monthDropdown = await page.locator("//select[@class='input ddl'][1]")
    await monthDropdown.selectOption("08")
    await page.locator("//select[@class='input ddl'][2]").selectOption("27")
    await page.waitForTimeout(5_000)

    // Dynamic Dropdown
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind", {
        delay: 150 //milliseconds
    })
    const country_options = await page.locator(".ta-results")
    await country_options.waitFor()
    const totalCountriesCount = await country_options.locator("button").count()
    for (let i = 0; i < totalCountriesCount; i++) {
        const countryname = await country_options.locator("button").nth(i).textContent()
        if (countryname.trim() === "India" || countryname.includes("India")) {
            await country_options.locator("button").nth(i).click()
            break
        }
    }

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
    await page.locator(".action_submit").click()

    //Verify Text
    // locator("h3:has-text('ZARA COAT 3')
    const order_confirmation_text = await page.locator(".hero-primary").textContent()
    console.log("order_confirmation_text", order_confirmation_text);
    await expect(order_confirmation_text).toContain("Thank you")
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
})