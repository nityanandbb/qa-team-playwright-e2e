export class LoginPage {

    constructor(page) {

        this.page = page;

        this.email = page.getByPlaceholder('email@example.com');

        this.password = page.getByPlaceholder('enter your passsword');

        this.loginButton = page.getByRole('button', {name: 'Login'});

    }

    async open() {

        await this.page.goto('https://rahulshettyacademy.com/client');

    }

    async login(email, password) {

        await this.email.fill(email);

        await this.password.fill(password);

        await this.loginButton.click();

    }

}