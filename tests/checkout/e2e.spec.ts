import { test, expect} from "@playwright/test";


test.describe("Checkout item e2e scenario", ()=> {

    test.use({storageState: ".auth/customer01.json"});
    
    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
        //check if it is login
        await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
    });

    test("Checkout item and buy now pay later with login account", async({ page, headless }) => {

        // add item to cart
        await page.getByText("Combination Pliers").click();
        await page.getByTestId("add-to-cart").click();
        await expect(page.getByLabel('Product added to shopping')).toContainText('Product added to shopping cart.');
        await expect(page.getByTestId("cart-quantity")).toHaveText("1");

        // navigate to cart

        await page.getByTestId("nav-cart").click();
        expect(page).toHaveURL("https://practicesoftwaretesting.com/checkout");

        // proceed

        await page.getByTestId("proceed-1").click();
        await page.getByTestId("proceed-2").click();
        await expect(
            page.locator(".step-indicator").filter({hasText: "2"})
        ).toHaveCSS("background-color", "rgb(51, 153, 51)");

        //insert billing address 

        await page.getByTestId("address").clear();
        await page.getByTestId("address").fill("TRX Building");

        await page.getByTestId("city").clear();
        await page.getByTestId("city").fill("Kuala Lumpur");

        await page.getByTestId("state").clear();
        await page.getByTestId("state").fill("Kuala Lumpur");

        await page.getByTestId("country").clear();
        await page.getByTestId("country").fill("Malaysia");

        await page.getByTestId("postcode").clear();
        await page.getByTestId("postcode").fill("55188");

        await page.getByTestId("proceed-3").click();

        //Choose payment and confirm 
        await expect(page.getByTestId("finish")).toBeDisabled();
        await page.getByTestId("payment-method").selectOption("buy-now-pay-later");
        await page.getByTestId("monthly_installments").selectOption("12");
        await page.getByTestId("finish").click();
        await expect(page.locator("div.alert-success div.help-block")).toContainText("Payment was successful");

        // visual test the screen if headless
        headless ?
            await test.step("visual test", async ()=> {
                await expect(page).toHaveScreenshot("bnpl-checkout.png", {
                    mask: [page.getByTitle("Practice Software Testing - Toolshop")]
                })
        }) : console.log("Running in Headed mode. no screenshot !")
        
    });
});