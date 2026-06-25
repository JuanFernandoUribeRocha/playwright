import { test, expect } from "playwright/test";
import { LoginPage } from "./pageobjects/LoginPage";

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

  await expect(
    page.getByRole("button", { name: "Checkout", exact: true }),
  ).toBeVisible();

  //Comparando valores 'actual' vs 'expected' para corroborar la igualdad

  await expect(actualName).toEqual(expectedName);
  await expect(actualDescription).toEqual(expectedDescription);
  await expect(actualPrice).toEqual(expectedPrice);

  await page.getByRole("button", { name: "Checkout", exact: true }).click();

  //Checkout your information

  await expect(page.getByRole("button", { name: "Continue", exact: true }))
    .toBeVisible;

  await page.getByRole("textbox", { name: "First Name" }).fill("Fernando");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Uribe");
  await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("82060");

  await page.getByRole("button", { name: "Continue", exact: true }).click();

  //Validando datos del item en 'Checkout: Overview', se crearán datos 'overview' y se compararán con los datos 'expected'

  await expect(
    page.getByRole("button", { name: "Finish", exact: true }),
  ).toBeVisible();

  const overviewName = await page.locator(".inventory_item_name").innerText();
  const overviewDescription = await page
    .locator(".inventory_item_desc")
    .innerText();
  const overviewPrice = await page.locator(".inventory_item_price").innerText();

  await expect(overviewName).toEqual(expectedName);
  await expect(overviewDescription).toEqual(expectedDescription);
  await expect(overviewPrice).toEqual(expectedPrice);

  await page.getByRole("button", { name: "Finish", exact: true }).click();

  //Verificando orden exitosa

  await expect(
    page.getByRole("heading", {
      name: "Thank you for your order!",
      exact: true,
    }),
  ).toBeVisible();
});

/*
Reutilizando código con construcción de clase LoginPage que invoque los pasos del login
*/
test("test_automatizar_carrito_pageobject", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  //Proceso de login con clase LoginPage

  const login = new LoginPage(page);

  await login.loginWithCredentials("standard_user", "secret_sauce");

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

  await expect(
    page.getByRole("button", { name: "Checkout", exact: true }),
  ).toBeVisible();

  //Comparando valores 'actual' vs 'expected' para corroborar la igualdad

  await expect(actualName).toEqual(expectedName);
  await expect(actualDescription).toEqual(expectedDescription);
  await expect(actualPrice).toEqual(expectedPrice);

  await page.getByRole("button", { name: "Checkout", exact: true }).click();

  //Checkout your information

  await expect(page.getByRole("button", { name: "Continue", exact: true }))
    .toBeVisible;

  await page.getByRole("textbox", { name: "First Name" }).fill("Fernando");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Uribe");
  await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("82060");

  await page.getByRole("button", { name: "Continue", exact: true }).click();

  //Validando datos del item en 'Checkout: Overview', se crearán datos 'overview' y se compararán con los datos 'expected'

  await expect(
    page.getByRole("button", { name: "Finish", exact: true }),
  ).toBeVisible();

  const overviewName = await page.locator(".inventory_item_name").innerText();
  const overviewDescription = await page
    .locator(".inventory_item_desc")
    .innerText();
  const overviewPrice = await page.locator(".inventory_item_price").innerText();

  await expect(overviewName).toEqual(expectedName);
  await expect(overviewDescription).toEqual(expectedDescription);
  await expect(overviewPrice).toEqual(expectedPrice);

  await page.getByRole("button", { name: "Finish", exact: true }).click();

  //Verificando orden exitosa

  await expect(
    page.getByRole("heading", {
      name: "Thank you for your order!",
      exact: true,
    }),
  ).toBeVisible();
});
