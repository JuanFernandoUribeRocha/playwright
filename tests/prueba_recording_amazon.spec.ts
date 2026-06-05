import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.amazon.com.mx/");
  //await page.getByRole('searchbox', { name: 'Buscar en Amazon.com.mx' }).click();
  await page
    .getByRole("searchbox", { name: "Buscar en Amazon.com.mx" })
    .fill("iphone 17");
  await page
    .getByRole("searchbox", { name: "Buscar en Amazon.com.mx" })
    .press("Enter");
  await page.locator(".a-link-normal.s-no-outline").first().click();
  await page
    .getByRole("button", {
      name: "Agregar al carrito",
      description: "Agregar al Carrito",
      exact: true,
    })
    .click();
  //await page.getByRole("button", { name: "No, gracias" }).click();
  //await page.getByRole('button', { name: 'No, gracias' }).click();
});
