//playwright interactive ui => npx playwright test --ui
//playwright inspector => npx playwright test --dedug
//playwright codegen => npx playwright codegen
//playwrigth codegen => npx playwright codegen https://rahulshettyacademy.com/angularpractice

import { test, expect } from '@playwright/test';

test('Script Generation using CodeGen', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('form input[name="name"]').click();
    await page.locator('form input[name="name"]').fill("Name");

    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('shreenidhi.n@abc.com');

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill("Nidhi");

    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
    await expect(page.getByRole('checkbox', { name: 'Check me out if you Love' })).toBeChecked();

    await page.getByLabel('Gender').selectOption('Male');

    await page.getByRole('radio', { name: 'Employed' }).check();
    await expect(page.getByRole('radio', { name: 'Employed' })).toBeChecked();


    await page.locator('input[name="bday"]').fill('1996-07-08');

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByRole('heading', { name: 'Two-way Data Binding example:' }).getByRole('textbox').click();
    await page.getByRole('heading', { name: 'Two-way Data Binding example:' }).getByRole('textbox').fill('123abc');

});

test.only('Script Generation using CodeGen Extended', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await expect(page.getByRole('list')).toContainText('Shop');
    await page.getByRole('link', { name: 'Shop' }).click();
    await expect(page.getByRole('heading', { name: 'Shop Name' })).toBeVisible();
    await page.getByRole('link', { name: 'Nokia Edge' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'iphone X' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.getByText('Checkout ( 1 ) (current)').click();
    await expect(page.locator('h4')).toContainText('Nokia Edge');
    await expect(page.locator('#exampleInputEmail1')).toHaveValue('1');
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
    await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('blr');
    await page.getByText('I agree with the term &').click();
    await page.getByRole('button', { name: 'Purchase' }).click();
    await page.getByText('× Success! Thank you! Your').click();
    await expect(page.getByRole('strong')).toContainText('Success!');
});