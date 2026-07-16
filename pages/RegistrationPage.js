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
        this.successLoginButton = page.getByRole('button', { name: 'Login' });

    }

    async open() {

        await this.page.goto(`${process.env.BASE_URL}/#/auth/register`);

    }

    async fillFirstName(firstName) {

        await this.firstName.fill(firstName);

    }

    async fillLastName(lastName) {

        await this.lastName.fill(lastName);

    }

    async fillEmail(email) {

        await this.email.fill(email);

    }

    async fillMobile(mobile) {

        await this.mobile.fill(mobile);

    }

    async selectOccupation(occupation) {

        await this.occupation.selectOption({ label: occupation });

    }

    async selectGender() {

        await this.gender.check();

    }

    async fillPassword(password) {

        await this.password.fill(password);

    }

    async fillConfirmPassword(password) {

        await this.confirmPassword.fill(password);

    }

    async acceptTerms() {

        await this.checkbox.check();

    }

    async clickRegister() {

        await this.registerButton.click();

    }

    async register(email, password) {

        await this.fillFirstName('John1996');
        await this.fillLastName('Doe');
        await this.fillEmail(email);
        await this.fillMobile('9876543211');
        await this.selectOccupation('Engineer');
        await this.selectGender();
        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
        await this.acceptTerms();
        await this.clickRegister();

    }

    async clickSuccessLogin() {

        await this.successLoginButton.click();
        await this.page.waitForURL(/auth\/login/, { timeout: 10000 });

    }

}