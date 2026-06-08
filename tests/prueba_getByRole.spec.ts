import { test, expect } from "playwright/test";

test("test_getByRole", async ({ page }) => {
  await page.goto("https://www.amazon.com.mx");
  await page.getByRole("link", { name: "Lo nuevo", exact: true }).click();
  await page.pause();
  await expect(
    page.getByRole("heading", {
      name: "Últimas novedades de Amazon",
      exact: true,
    }),
  ).toBeVisible;
});
