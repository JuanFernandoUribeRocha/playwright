import { test, expect } from "@playwright/test";

test("xpathTest", async ({ page }) => {
  await page.goto("https://siia.uasnet.mx/alumnos/");
  await page.locator('//input[@id="txtCuenta"]').fill("12345678");
  await page.locator('//input[@name="txtNip"]').fill("unimen57");
  await page.locator('//button[@class="btn btn-block text-white"]').click();
  await expect(page.locator("//h1")).toBeVisible();
  await page.pause();
});

test("css_selector_test", async ({ page }) => {
  await page.goto("https://siia.uasnet.mx/alumnos/");
  await page.locator("div.div-avisos").nth(1).click(); //nth(1) me permite interactuar con el segundo elemento identificado que cumpla con el locator declarado.
  await expect(page.locator("div#bv-modal-cartel-seguridad___BV_modal_body_"))
    .toBeVisible;
  await page.pause();
  await page.locator("button.close").click();
  await expect(page.locator("h5.header-titulo-superior")).toBeVisible;
});
