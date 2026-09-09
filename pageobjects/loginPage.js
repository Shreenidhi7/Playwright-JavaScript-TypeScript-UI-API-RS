export class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = page.getByPlaceholder("email@example.com")
        this.paswword = page.getByPlaceholder("enter your passsword")
        this.loginBtn = page.getByRole("button", { name: "Login" })
    }
    async visitUrl(url) {
        await this.page.goto(url)
    }
    async userLogin(username, password) {
        await this.userName.fill(username)
        await this.paswword.pressSequentially(password)
        await this.loginBtn.click()
        // await this.page.waitForLoadState("networkIdle")
    }
}