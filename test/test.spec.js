import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// (async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto('https://bitheap.tech');
//     await page.screenshot({path: 'screenshot.png'});
//     await browser.close();
// }) ();

// (async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();

//     await authenticatepage(page);
    
//     await browser.close()
// }) ();

test.describe('My Test Suite', () => {
    test('My test Case', async({}) => {
        const browser = await chromium.launch();
        const page = await browser.newPage();

        await authenticatepage(page);

        await prepareOrder(page);

        await placeOrder(page);

        await browser.close();
    });
});

async function authenticatepage(page) {
    await page.goto('/');
    await page.click('#menu-item-2330');
    await page.locator("[name='xoo-el-username']").fill(process.env.BITHEAP_USERNAME);
    await page.locator("[name='xoo-el-password']").fill(process.env.PASS);
    await page.locator('xpath=/html/body/div[6]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click();
    const text = await page.locator('css=#menu-item-2333 > a').textContent();
    if (text != 'Hello, Playwright'){
        console.error("The authentication was not successful!")
    }
    else {
        console.log("Login Successful!")
    }
    await page.screenshot({path: 'screenshot.png'});
}

async function prepareOrder(page) {
    await page.click('#menu-item-1310');
    await page.locator('xpath=//*[@id="main"]/nav/ul/li[2]/a').click();
    await page.locator('css=#main > ul > li.product.type-product.post-211.status-publish.instock.product_cat-uncategorized.purchasable.product-type-simple > a.button.product_type_simple.add_to_cart_button.ajax_add_to_cart').click();
    await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click();
    await page.getByText('Proceed to checkout').click();
    await page.getByPlaceholder('House number and street name').fill("test");
    console.log('Order prepared...');
}

async function placeOrder(page){
    await page.locator('xpath=//*[@id="billing_postcode"]').fill("1234");
    await page.locator('css=#billing_city').fill("Zurich");
    await page.click('#place_order');

    await page.waitForTimeout(3000); //delay for 3 seconds

    const count = await page.getByText('Order received').count();
    expect(count).toBe(1);
    console.log('Order placed sucessfuly!');
}
