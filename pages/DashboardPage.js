export class DashboardPage {

    constructor(page) {

        this.page = page;

        this.firstProductTitle = page.locator('.card-body b').first();

        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });

        this.firstAddToCart = page.locator('.card-body').first().getByRole('button', { name: 'Add To Cart' });

        this.cartButton = page.locator('[routerlink="/dashboard/cart"]');

    }

    async getFirstProductTitle() {

        return await this.firstProductTitle.textContent();

    }

    async clickSignOut() {

        await this.signOutButton.click();

    }

    async addFirstProductToCart() {

        await this.firstAddToCart.click();

    }

    async openCart() {

        await this.cartButton.click();

    }

}