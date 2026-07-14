export class DashboardPage {

    constructor(page) {

        this.page = page;

        this.firstAddToCart = page.locator('.card-body').first().getByRole('button', { name: 'Add To Cart' });

        this.cartButton = page.locator('[routerlink="/dashboard/cart"]');

    }

    async addFirstProductToCart() {

        await this.firstAddToCart.click();

    }

    async openCart() {

        await this.cartButton.click();

    }

}