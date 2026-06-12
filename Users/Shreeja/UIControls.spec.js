const {test,expect} = require ('@playwright/test');


test.only ('Page playwright test', async({page})=>{

   const username = page.locator("#username") // by ID 
   const password = page.locator("[type='password']") // by class attritube (type)
   const submit = page.locator(".btn.btn-info.btn-md") // by class name

    await page.goto ('https://rahulshettyacademy.com/loginpagePractise/');

    //get page title
    console.log (await page.title())
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
   
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");

    // radio button 
    console.log("----------------------Radio Button--------------------------")
    const radiobutton = page.locator(".radiotextsty");
    await radiobutton.last().click(); // Clicking second option as class have 2 options and we need to click on last option (that is user)
    await page.locator("#okayBtn").click(); // popup
    // assertion for the redio button
    await expect (radiobutton.last()).toBeChecked();

    //downdrop
    console.log("----------------------Downdrop--------------------------")
    const downdrop = page.locator("select.form-control")
    await downdrop.selectOption("Consultant")
    //assertion for downdrop
    await expect(downdrop).toContainText("Consult"); // checking for partial text match
    await expect(page.locator("select.form-control option:checked")).toHaveText("Consultant"); // checking for extact value match
    
    //Checkbox
     console.log("----------------------Checkbox--------------------------")
     const checkbox = page.locator("#terms")
     await checkbox.check();
     // assertion for check
     await expect(checkbox).toBeChecked();
     await checkbox.uncheck()
    expect (await checkbox.isChecked()).toBeFalsy();









    //page.pause();

});
