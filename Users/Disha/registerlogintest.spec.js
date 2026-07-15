import { test, expect } from '@playwright/test';

test('Register + Login + Invalid Login Flow', async ({ page }) => {  
    const email = `testing1235566@gmail.com`;  
    const password = 'Welcome@2026';   
    
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register'); 


    await page.getByPlaceholder('First Name').fill('Disha'); 
    await page.getByPlaceholder('Last Name').fill('Katariya');
    await page.getByPlaceholder('email@example.com').fill(email);  
    await page.getByPlaceholder('enter your number').fill('7057971354');


    await page.locator('select').selectOption({ label: 'Student' });
    await page.locator('input[value="Female"]').check();


    await page.locator('#userPassword').fill(password);  
    await page.locator('#confirmPassword').fill(password);


    await page.locator('input[type="checkbox"]').check();


    await page.getByRole('button', { name: 'Register' }).click();


    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');


    await expect(page).toHaveURL(/auth\/login/);
    
    
    await page.getByPlaceholder('email@example.com').fill(email);  
    await page.getByPlaceholder('enter your passsword').fill(password);
    
    
    await page.getByRole('button', { name: 'Login' }).click(); 
    
    
    //await expect(page.getByText('AUTOMATION')).toBeVisible();
    await expect(page).toHaveURL(/dashboard\/dash/);  
    
    

const productTitle = await page.locator('.card-body b').first().textContent();
console.log('Product Title:', productTitle);   
    await page.getByRole('button', { name: 'Sign Out' }).click();
    
    

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');  
    await page.getByPlaceholder('email@example.com').fill('abcd@12.test.com');


    await page.getByPlaceholder('enter your passsword').fill('abcd555');


    await page.getByRole('button', { name: 'Login' }).click();  
      

    const errorMsg = page.locator('#toast-container');

    await expect(errorMsg).toBeVisible(); 
    await expect(errorMsg).toHaveText(/Incorrect email or password/i);

});
