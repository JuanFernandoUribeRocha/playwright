import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppingCartContainer: Locator;

  /*
El constructor es lo primero que se va a invocar, aquí se contruirá todo lo relacionado a la localización de los elementos.
*/
  constructor(page: Page) {
    this.usernameTextbox = page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.shoppingCartContainer = page.locator(".shopping_cart_container");
  }

  /*
Métodos
*/

  async fillUsername(username: string) {
    await this.usernameTextbox.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordTextbox.fill(password);
  }

  async clickOnLogin() {
    await this.loginButton.click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickOnLogin();
  }

  async checkSuccessfullLogin() {
    await expect(this.shoppingCartContainer).toBeVisible();
  }
}
