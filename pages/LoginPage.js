export class LoginPage {

    constructor(page) {

        this.page = page;
        this.email = page.getByPlaceholder('email@example.com');
        this.password = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });

    }

    async login(email, password) {

        await this.page.goto('https://rahulshettyacademy.com/client');

        await this.email.fill(email);

        await this.password.fill(password);

        await this.loginButton.click();

    }

}