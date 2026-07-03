export class RegistrationPage {

    constructor(page) {

        this.page = page;

        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('email@example.com');
        this.mobile = page.getByPlaceholder('enter your number');
        this.occupation = page.getByRole('combobox');
        this.gender = page.getByRole('radio', { name: 'Male', exact: true });
        this.password = page.locator('#userPassword');
        this.confirmPassword = page.locator('#confirmPassword');
        this.checkbox = page.getByRole('checkbox');
        this.registerButton = page.getByRole('button', { name: 'Register' });

    }

    async open() {

        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/register');

    }

    async register(email, password) {

        await this.firstName.fill('Tushar');

        await this.lastName.fill('Mali');

        await this.email.fill(email);

        await this.mobile.fill('9876543210');

        await this.occupation.selectOption({ label: 'Engineer' });

        await this.gender.check();

        await this.password.fill(password);

        await this.confirmPassword.fill(password);

        await this.checkbox.check();

        await this.registerButton.click();

    }

}