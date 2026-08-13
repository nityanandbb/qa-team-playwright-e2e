export class AlertHandlingPage {

    constructor(page) {

        this.page = page;
        this.nameInput = page.getByPlaceholder('Enter Your Name');
        this.alertButton = page.getByRole('button', { name: 'Alert' });

    }

    async open() {

        await this.page.goto(process.env.PRACTICE_URL);

    }

    async fillName(name) {

        await this.nameInput.fill(name);

    }

    async clickAlert() {

        await this.alertButton.click();

    }

    async handleAlert(expectedMessage) {

        return new Promise((resolve) => {
            this.page.once('dialog', async dialog => {
                resolve({
                    type: dialog.type(),
                    message: dialog.message()
                });
                await dialog.accept();
            });
        });

    }

}
