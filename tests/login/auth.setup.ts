import { test as setup, expect } from "@playwright/test";

setup("Create customer 01 setup", async ({ page, context }) => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customerAuthFile = ".auth/customer01.json";

    await page.goto("https://practicesoftwaretesting.com/auth/login");
    // fill the details 
    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-submit").click();
    //validate it is login with Jane Doe
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');

    await context.storageState({ path: customerAuthFile });

});