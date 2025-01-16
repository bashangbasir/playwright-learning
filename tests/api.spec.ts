import { test, expect } from "@playwright/test";

test("POST user/login", async ({ request })=> {

    const apiUrl = "https://api.practicesoftwaretesting.com";

    const response = await request.post( apiUrl + "/users/login", {
        data: {
            email:"customer@practicesoftwaretesting.com",
            password: "welcome01"
        },
    });

    expect(response.status()).toBe(200);
    
    const responseBody = await response.json()
    expect(responseBody.access_token).toBeTruthy();
    expect(responseBody.expires_in).toBe(300);
    expect(responseBody.token_type).toBe("bearer")

});

test("GET /products", async ({ request })=> {

    const apiUrl = "https://api.practicesoftwaretesting.com";
    const response = await request.get( apiUrl + "/products");
    expect(response.status()).toBe(200);

    const responseBody = await response.json()
    expect(responseBody.data.length).toBe(9);
    expect(responseBody.total).toBe(50);

});