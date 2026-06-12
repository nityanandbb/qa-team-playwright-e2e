const {test,expect} = require ('@playwright/test');

//using browser context

test ('Browser context playwright test', async ({browser})=> 
{
  
   const context = await browser.newContext()
    const page = await context.newPage()

    //const username = page.locator("#username") // by ID 

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise/');
    
    console.log (await page.title())

    const documentlink = page.locator("[href*='documents-request']");

    // Switching new page opened and perfrom  click and waiting for page action togather using promise all
    const[newPage] = await Promise.all (

     [ 
        context.waitForEvent('page'),
         documentlink.click(),

     ]) //new page open


     //senario : if suppose we need to only domain from the test and put that into user name filed on the main page

     //reding red text on the new page
    const TextOnNewPage = await newPage.locator(".im-para.red").textContent(); 

    // spliting text on the bases on @

    const arraytext = TextOnNewPage.split('@')

    console.log(arraytext[1]); // text : @rahulshettyacademy.com with below template to receive response

    const domain = arraytext[1].split(" ")[0]

     //console.log(domain);

     // enetring above domain value to the main page username field


    await page.locator("#username").fill(domain);

    page.pause();


    console.log(await page.locator("#username").inputValue());







});