import { test, expect } from '@playwright/test';

test.describe( "Home page", () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
    });

    let productGrid;

    test("Check sign in", async ({page}) => {
        await page.goto("https://practicesoftwaretesting.com/");
        // check sign in link
        await expect(page.getByTestId('nav-sign-in')).toHaveText("Sign in")
    });

    test("validate page title", async({page}) => {
        //check title
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });

    test("check defaults item displayed", async({page}) => {
        //check items displayed
        productGrid = page.locator(".col-md-9");
        await expect(productGrid.getByRole("link")).toHaveCount(9);
    });
        
    test("Search for Thor Hammer and validate result", async({page}) => {
        //search thor hammer and check result
        productGrid = page.locator(".col-md-9");
        await page.getByTestId('search-query').fill("Thor Hammer");
        await page.getByTestId('search-submit').click();
        await expect(productGrid.getByRole("link")).toHaveCount(1);
        expect(await page.getByAltText("Thor Hammer")).toBeVisible();   
    });
    
});