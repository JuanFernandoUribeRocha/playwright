import { test, expect } from "playwright/test";

test("test_automatizar_carrito", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  //await page.pause();

  //Obteniendo los datos esperados de un elemento random, recorriendo todos los items y seleccionando alguno random

  const allItems = await page.locator(".inventory_item").all();

  console.log(`Cantidad de items: ${allItems.length}`);

  const randomIndex = Math.floor(Math.random() * allItems.length);

  const randomItem = allItems[randomIndex];

  //Guardando los valores mostrados en la pantalla inicial 'expected'
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
    `expectedName: ${expectedName},\nexpectedDescription: ${expectedDescription}, \nexpectedPrice: ${expectedPrice}`,
  );

  await page
    .getByRole("button", { name: "Add to cart" })
    .nth(randomIndex)
    .click();
  await page.locator(".shopping_cart_link").click();

  //Guardando los valores mostrados en el carrito 'actual'

  const actualName = await page.locator(".inventory_item_name").innerText();
  const actualDescription = await page
    .locator(".inventory_item_desc")
    .innerText();
  const actualPrice = await page.locator(".inventory_item_price").innerText();

  console.log(
    `actualName: ${actualName},\nactualDescription: ${actualDescription}, \nactualPrice: ${actualPrice}`,
  );

  //Comparando valores 'actual' vs 'expected' para corroborar la igualdad

  await expect(actualName).toEqual(expectedName);
  await expect(actualDescription).toEqual(expectedDescription);
  await expect(actualPrice).toEqual(expectedPrice);
});
