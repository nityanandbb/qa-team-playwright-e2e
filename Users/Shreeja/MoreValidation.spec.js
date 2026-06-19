

const {test,expect} = require ('@playwright/test');


test('Iframe Handling', async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

// await page.goto("http://google.com");  // to go to another url
// await page.goBack();                   // go in back to the page (clicking back arrow button on of browser)
// await page.goForward();                //go in forword to the page (clicking forword arrow button on of browser)

await expect(page.locator("#displayed-text")).toBeVisible();

await page.locator("#hide-textbox").click();

await expect(page.locator("#displayed-text")).toBeHidden();

// await page.pause();

page.on('dialog', dialog => dialog.accept());   // to handle dialogs on the pages - positive - selecting on Ok

//page.on('dialog',dialog => dialog.dissmiss());   //to handle dialogs on the pages - negative - selecting on cancle

await page.locator("#confirmbtn").click();   //on click

await page.locator("#mousehover").hover();   //to handle dialogs on the pages on hover


const framesPage = page.frameLocator("#courses-iframe");   // Switching to the fream fromthe main page

await page.pause();

await framesPage.locator("li a[href*='lifetime-access']:visible").click();  // performing actions on frame - here visible is used to grab locator of the visible element 

const textCheck = await framesPage.locator(".text h2").textContent();

console.log(textCheck.split(" ")[1]);


});