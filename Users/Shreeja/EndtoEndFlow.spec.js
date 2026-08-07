const {test,expect} = require ('@playwright/test');

 const { Network } = require('node:inspector/promises');
const { PassThrough } = require('node:stream');

//using browser context

test ('Browser context playwright test', async ({browser})=> 
{

    const email = 'gobeb88837@algarr.com'
    const password = 'Dummy123'
  
    const context = await browser.newContext()
    const page = await context.newPage()
    const Products = await page.locator(".card-body")
    const ProductName = 'ZARA COAT 3'

    await page.goto ('https://rahulshettyacademy.com/client');
    
    console.log (await page.title())

    // login
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle'); // to wait for the networks gets idle
    await Products.first().waitFor(); // wait for first product to load on the page after login
    const Productstitles = await page.locator(".card-body b").allTextContents();
    console.log(Productstitles);

    //iterate to the products to get desierd product
    const count = await Products.count();

    for(let i= 0 ; i< count; ++i)

    {
        if (await Products.nth(i).locator("b").textContent() === ProductName) // loactor("b") indicates here product name that is child tag in css and we are checking under the scope of parent tag div
            
        {
            //add to card logic
            console.log('excuting')
           await Products.nth(i).locator("text= Add To Cart").click()
           break;

        }
    }

   // clicking on add to cart button
    await page.locator("[routerlink*='cart']").click();

    // waiting for first item to be load on cart page
    await page.locator("div li").first().waitFor();

    // checking added item is visible on the cark page or no
    const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

    expect( await bool).toBeTruthy();






   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 




   await page.pause();













});


/*
test.only ('Page playwright test', async({page})=>{

    
   const email = "gobeb88837@algarr.com";
   const password = 'Dummy123'

   const productName = 'ADIDAS ORIGINAL';
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");

   console.log (await page.title())

   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
 
   await page.locator(".btn.btn-danger").click();

  const errorMassage =  await expect (page.getByText("No Products in Your Cart !")).toBeVisible();

      await page.pause();


});


*/

