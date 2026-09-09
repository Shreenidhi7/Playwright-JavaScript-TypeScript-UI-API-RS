import { expect } from "@playwright/test"

export class DashboardPage {
    constructor(page) {
        this.page = page
        this.products = page.locator(".card .card-body")
        this.productsText = page.locator(".card-body .b")

        this.productAddToCart = page.locator("[aria-label$='Product Added To Cart']")

        this.routeToCart = page.locator("[routerlink*='cart']")
        this.cartButton = page.getByRole("listitem").getByRole("button", { name: "Cart" })

    }

    async searchProducts(productNameExpected) {
        // List out all the cards and its titles
        // const cart_products = await page.locator(".card .card-body")
        const cart_products = this.products
        const cardTitlesTexts = await cart_products.allTextContents()
        console.log("cardTitlesTexts", cardTitlesTexts);

        //Select a particular card/product from the table - Zara Coat 3
        const totalCount = await cart_products.count()
        console.log("totalCount", totalCount);

        for (let i = 0; i < totalCount; i++) {
            const cart_product_name = await cart_products.nth(i).locator("b").textContent()
            // console.log("cart_product_name =", cart_product_name);
            if (await cart_product_name == await productNameExpected) {
                await cart_products.nth(i).locator("//button[@class='btn w-10 rounded']").click()
                break
            }
        }
    }

    async addProductToCart() {
        // const page = await webContext.newPage()
        // await page.goto("https://rahulshettyacademy.com/client/#/dashboard/")
        await this.page.locator(".card-body").filter({
            hasText: "ZARA COAT 3"
        }).getByRole("button", { name: "Add to Cart" }).click()

        // Wait for Toastify message to diasplay and asset
        await this.page.waitForSelector("[aria-label$='Product Added To Cart']")
        // await this.page.waitForSelector(this.productAddToCart)
        const success_message_toastify = await this.page.locator("[aria-label$='Product Added To Cart']")
        // const success_message_toastify = await this.addProductToCart
        expect(success_message_toastify).toBeVisible()

        // Click on Cart button (top nav menu)
        // await page.locator("[routerlink*='cart']").click()
        //await this.page.getByRole("listitem").getByRole("button", { name: "Cart" }).click()

    }

    async navigateToCart() {
        // this.routeToCart.click()
        await this.cartButton.click()
    }

}