import { test, expect } from '@playwright/test';

test('e2e flow' , async({page})=> {

    const product = await page.locator(".card-body");
    const expectedProduct = 'ZARA COAT 3';
    const email = "tester1993@example.com";
    //login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Tester123@")
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle')

    //find the product
    const productName = await product.allTextContents();
    const count = await product.count();
    for (let i= 0 ; i<count ; i++)
        {
            if(await product.nth(i).locator('b').textContent() == expectedProduct)
                {
                    await product.nth(i).locator("text=Add To Cart").click();
                    break;
                }
        }

    // verify cart has product   
    await page.locator('[routerlink*=cart]').click();
    await page.waitForLoadState('networkidle')
    await page.locator('div li').first().waitFor();
    await expect(page.locator("h3:has-text('ZARA COAT 3')").isVisible());

    //proceed to check out
    await page.locator('text=Checkout').click();
    await page.waitForLoadState('networkidle')

    //fill the checkout form
    const paymentform = await page.locator(".form__cc");

    await paymentform.locator("input[value='4542 9931 9292 2293']").fill('4542 9931 9292 2293');
    await paymentform.locator(".input.ddl").nth(0).selectOption('02');
    await paymentform.locator(".input.ddl").nth(1).selectOption('25');
    await paymentform.locator("input.input.txt").nth(2).fill("Tester");
    //await paymentform.locator("input.input.txt").nth(3).fill("")
    //await paymentform.locator('text=Apply Coupon').click();

    //Shipping address
    await page.locator("[placeholder='Select Country']").pressSequentially('india');
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i=0 ; i<optionsCount ; i++){

        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === ' India')
        {
            await dropdown.locator('button').nth(i).click();
            break;
        }

    }

    //check email id 
    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email)

    await page.locator('text = Place Order ').click();

    await expect(page.locator("h1:has-text(' Thankyou for the order. ')")).toBeVisible();
    //fetch order id 
   const orderid =  await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

   //verify order id in orders
       await page.waitForLoadState('networkidle')

   await page.locator('button[routerlink*=myorders]').click();
    await page.waitForLoadState('networkidle')
    const orderTable = await page.locator('tbody tr');
        const orderCount = await page.locator('tbody tr').count();


    for (let i=0 ; i<orderCount; i++){

        const actualid = await orderTable.locator("[scope*='row']").nth(i).textContent();
        if(orderid.includes(actualid)){
            console.log('x')
            await orderTable.locator('text=View').nth(i).click();
            break;
        }
       
    }

           await page.waitForLoadState('networkidle')
               await page.locator('.col-text').waitFor();


    const orderview = await page.locator('.col-text').textContent();

    expect(orderid.includes(orderview)).toBeTruthy








});