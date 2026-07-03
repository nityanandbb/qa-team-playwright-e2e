export class VisibilityPage {

    constructor(page) {

        this.page = page;

        this.textbox = page.locator('#displayed-text');

        this.hideButton = page.getByRole('button', {name: 'Hide'});

        this.showButton = page.getByRole('button', {name: 'Show'});

    }

    async open() {

        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    }

    async hideTextbox() {

        await this.hideButton.click();

    }

    async showTextbox() {

        await this.showButton.click();

    }

}