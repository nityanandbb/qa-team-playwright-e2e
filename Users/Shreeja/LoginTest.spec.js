const {test,expect} = require ('@playwright/test');


test.only ('Page playwright test', async({page})=>{

   const username = page.locator("#username") // by ID 
   const password = page.locator("[type='password']") // by class attritube (type)
   const submit = page.locator(".btn.btn-info.btn-md") // by class name
   const productlist = page.locator(".card-body a") // by parent class >> child class 
    await page.goto ('https://rahulshettyacademy.com/loginpagePractise/');
    //get page title
    console.log (await page.title())
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
   
   await username.fill("rahulshetty");
   await password.fill("Learning@830$3mK2");
   await submit.click();

   //reading content of error massage when you hit inccorect login

   await page.locator("[style*='display: block;']").textContent();
   await expect(page.locator("[style*='display: block;']")).toContainText('Incorrect'); // check if error massage should content incorrect substring

    // lets clear input filed and add valid username and password 

    await username.fill(" ");
    await username.fill("rahulshettyacademy");

    await password.fill(" ");
    await password.fill("Learning@830$3mK2");

     await submit.click();

     // on sucessful login, verify the the title of first product is get displayed

     console.log (await page.locator(".card-body a").nth(0).textContent()); //     await page.locator(".card-body a").first().textContent();
      
     console.log (await page.locator(".card-body a").nth(1).textContent()); //
      
    console.log( await page.locator(".card-body a").last().textContent()); //


    const NameOfallProducts = await productlist.allTextContents();

    console.log(NameOfallProducts);




});