export class LoginPage {

    constructor(page) {

        this.page = page;
        this.email = page.getByPlaceholder('email@example.com');
        this.password = page.getByPlaceholder('enter your passsword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('#toast-container');

    }

    async open() {

        await this.page.goto(`${process.env.BASE_URL}/#/auth/login`);

    }

    async fillEmail(email) {

        await this.email.fill(email);

    }

    async fillPassword(password) {

        await this.password.fill(password);

    }

    async clickLogin() {

        await this.loginButton.click();

    }

    getErrorMessage() {

        return this.errorMessage;

    }

}