const {test,expect} = require ('@playwright/test');
const { link } = require('node:fs');

// registration negative flow
test('Page Registration Negative validation', async({page})=>{

await page.goto ('https://rahulshettyacademy.com/client/#/auth/register');


//await page.getByRole('link',{name:'Register'}).click()

//Senario 1: Clicking on submit without filling form
await page.locator(".btn.btn-block.login-btn").click();

//Checking error massage and applying assertions
const error1 = await page.locator(".invalid-feedback").first();
await expect(error1).toBeVisible();
await expect(error1).toHaveText('*First Name is required');

//senario 2: invaild Email 

await page.locator("#userEmail").fill("not-valid-email");
await page.locator(".btn.btn-block.login-btn").click();

//Checking error massage and applying assertions 

const emailerror1 = await page.getByText('*Enter Valid Email')
await expect(emailerror1).toBeVisible()
await expect(emailerror1).toHaveText('*Enter Valid Email');


// senario 3: Invalid phone number
const phone  = await page.getByPlaceholder('enter your number');
await phone.fill('+917428723247');
await page.locator(".btn.btn-block.login-btn").click();

//Checking error massage and applying assertions 
const errorphone = await page.getByText('*Phone Number must be 10 digit');
await expect(errorphone).toBeVisible()
await expect(errorphone).toHaveText('*Phone Number must be 10 digit');

// senario 4: Password validation
await page.locator('#userPassword').fill('Test23456');
await page.locator("#confirmPassword").fill(" ");

// Assert the error message is visible
  const errorPass = page.getByText('Password and Confirm Password must match with each other');
  await expect(errorPass).toBeVisible();
 await expect(errorPass).toHaveText('Password and Confirm Password must match with each other.');


// senario 5 : validation for existing user email
  // 2. Fill out Personal Details
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('email@example.com').fill("mebege8383@lidugw.com"); // Unique email
  await page.getByPlaceholder('enter your number').fill('7428730894');

  // 3. Select Occupation (Dropdown)
  await page.getByRole('combobox').selectOption('Engineer');

  // 4. Select Gender (Radio Button)
  await page.getByLabel('Male', { exact: true }).check();

  // 5. Password and Confirm Password
  const pass = 'Password123!';
  await page.locator('#userPassword').fill(pass);
  await page.locator('#confirmPassword').fill(pass);

  // 6. Checkbox (Age declaration)
  await page.locator('input[type="checkbox"]').check();

  // 7. Submit the Form
await page.locator(".btn.btn-block.login-btn").click();


      // Wait for the error box to appear
    const errorbox = page.locator('text=User already exisits with this Email Id!');
    await expect(errorbox).toBeVisible({ timeout: 8000 });
 
    // Assert the exact error message text
    await expect(errorbox).toHaveText('User already exisits with this Email Id!');


  /* 8. Validation: Check for Success Message
  // The site typically shows a "Account Created Successfully" heading
  const successMessage = page.locator('.headtext');
  await expect(successMessage).toContainText('Account Created Successfully');
  */

  //await page.pause();
});


// Registration positive flow
test('Page Registration positive validation', async({page})=>{

await page.goto ('https://rahulshettyacademy.com/client/#/auth/register');

const timestamp = Date.now();

const email = `test${timestamp}@algarr.com`;
const phone = `9${String(timestamp).slice(-9)}`;

// senario 5 : validation for existing user email
  // 2. Fill out Personal Details
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('User');
  await page.getByPlaceholder('email@example.com').fill(email); // Unique email
  await page.getByPlaceholder('enter your number').fill(phone);

  // 3. Select Occupation (Dropdown)
  await page.getByRole('combobox').selectOption('Engineer');

  // 4. Select Gender (Radio Button)
  await page.getByLabel('Male', { exact: true }).check();

  // 5. Password and Confirm Password
  const pass = 'Password123!';
  await page.locator('#userPassword').fill(pass);
  await page.locator('#confirmPassword').fill(pass);

  // 6. Checkbox (Age declaration)
  await page.locator('input[type="checkbox"]').check();

  // 7. Submit the Form
await page.locator(".btn.btn-block.login-btn").click();


  // The site typically shows a "Account Created Successfully" heading
  // Wait for navigation or success message


const successMessage = page.getByRole('heading', {name: 'Account Created Successfully'});

await expect(successMessage).toBeVisible();



});
