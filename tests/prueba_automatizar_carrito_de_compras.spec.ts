import { test, expect } from "playwright/test";

test("test_automatizar_carrito", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  //await page.pause();

  //Obteniendo los datos esperados de un elemento random

  const allItems = await page
    .locator("#inventory-container .inventory-item")
    .all();

  console.log(`Cantidad de items: ${allItems.length}`);

  const randomIndex = Math.floor(Math.random() * allItems.length);

  const randomItem = allItems[randomIndex];

  const expectedName = await randomItem
    .locator(".inventory_item_name")
    .innerText();
  const expectedDescription = await randomItem
    .locator(".inventory_item_desc")
    .innerText();
  const expectedPrice = await randomItem
    .locator(".inventory_item_price")
    .innerText();

  console.log(
    `expectedName: ${expectedName}, expectedDescription: ${expectedDescription}, expectedPrice: ${expectedPrice}`,
  );

  await page
    .getByRole("button", { name: "Add to cart" })
    .nth(randomIndex)
    .click();
  await page.getByRole("link", { name: "1" }).click();
});
