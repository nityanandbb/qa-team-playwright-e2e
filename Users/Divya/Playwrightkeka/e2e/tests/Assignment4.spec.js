import { test , expect} from '@playwright/test';
const path = require('path');
const fs = require('fs');

test ('test the form', async({page})=>{
    const filePath = path.resolve(__dirname, 'test-upload.txt');
    fs.writeFileSync(filePath, 'This is a test file for Playwright upload.');

    await page.goto("https://demoqa.com/automation-practice-form");


    //personal info
    await page.locator('#firstName').fill('tommy');
    await page.locator('#lastName').fill('Smith');
    await page.locator('#userEmail').fill('tom123s@test.com');
    await page.locator('#gender-radio-2').click();
    await page.locator('#userNumber').fill('9876543212');

    //date of birth
    await page.locator('#dateOfBirthInput').click();
    await page.selectOption('.react-datepicker__month-select' , '5')
    await page.selectOption('.react-datepicker__year-select' , '2010');
    await page.click('.react-datepicker__day.react-datepicker__day--004');

    //hobby
    await page.locator('#hobbies-checkbox-1').click();
    await page.locator('#hobbies-checkbox-2').click();

    //file input
    const fileInput = page.locator('#uploadPicture');
    await fileInput.setInputFiles(filePath);

    //Address
    await page.locator('#currentAddress').fill('Pune , Maharastha');
    await page.locator('#state').click();
    await page.click('text=NCR');
    await page.click('#city');
    await page.click('text=Delhi');
    await page.click('#submit');


    //submit success assertion
    await page.waitForSelector('#example-modal-sizes-title-lg');
    const modalTitle = await page.textContent('#example-modal-sizes-title-lg');
    console.log('Modal title:', modalTitle);
    expect(modalTitle).toBe('Thanks for submitting the form');
})

test.only('empty input validation', async({page})=>{

    await page.goto("https://demoqa.com/automation-practice-form");

    const firstname = await page.locator('#firstName')
    const lastname = await page.locator('#lastName')
    const number = await page.locator('#userNumber')


    //empty form
    await page.click('#submit');

const validity = await firstname.evaluate(el => ({
  valid: el.validity.valid,
  valueMissing: el.validity.valueMissing,
  typeMismatch: el.validity.typeMismatch,
}));

console.log(validity);
});




    // //grab the borders
    
    // const firstnameborderColor = await firstname.evaluate(el =>
    //   window.getComputedStyle(el).borderColor
    // );
    // const lastnameborderColor = await lastname.evaluate(el =>
    //   window.getComputedStyle(el).borderColor
    // );
    // const numberborderColor = await number.evaluate(el =>
    //   window.getComputedStyle(el).borderColor
    // );

    // //validate border colours
    // expect(firstnameborderColor).toBe('rgb(220, 53, 69)');
    // expect(lastnameborderColor).toBe('rgb(220, 53, 69)');
    // expect(numberborderColor).toBe('rgb(220, 53, 69)');



test('invalid input validation', async({page})=>{

    await page.goto("https://demoqa.com/automation-practice-form");

    
    const email = await page.locator('#userEmail')
    const number = await page.locator('#userNumber')


    //invalid data form
    await page.locator('#userEmail').fill('tom123s');
    await page.locator('#userNumber').fill('9873212');
    await page.click('#submit');


    //grab the borders
    const EmailborderColor = await email.evaluate(el =>
      window.getComputedStyle(el).borderColor
    );
    
    const numberborderColor = await number.evaluate(el =>
      window.getComputedStyle(el).borderColor
    );

    //validate border colours
    expect(EmailborderColor).toBe('rgb(222, 208, 214)');
    expect(numberborderColor).toBe('rgb(220, 53, 69)');


})