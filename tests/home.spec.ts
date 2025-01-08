import { test, expect } from '@playwright/test';

test("Home page", async ({page}) => {

    await page.goto("https://practicesoftwaretesting.com/");
    // check sign in link 
    await expect(page.getByTestId('nav-sign-in')).toHaveText("Sign in")
    //check title
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    //check items displayed 
    const productGrid = page.locator(".col-md-9"); 
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    //search thor hammer and check result 
    await page.getByTestId('search-query').fill("Thor Hammer");
    await page.getByTestId('search-submit').click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    expect(await page.getByAltText("Thor Hammer")).toBeVisible();

})