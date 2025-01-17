import { test, expect } from "@playwright/test";
import { request } from "http";

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

test("GET product/{id}", async({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProdutsResponse = await request.get( apiUrl + "/products");
    expect(getProdutsResponse.status()).toBe(200);

    const responseBody = await getProdutsResponse.json()
    const productId = responseBody.data[0].id

    const getProductById = await request.get( apiUrl + "/products/" + productId);
    expect(getProductById.status()).toBe(200);
    
    const getProductByIdResponse = await getProductById.json();

    expect(getProductByIdResponse.price).toBeTruthy();
    expect(getProductByIdResponse.id).toBe(productId);
    expect(getProductByIdResponse.name).toBeTruthy();

});