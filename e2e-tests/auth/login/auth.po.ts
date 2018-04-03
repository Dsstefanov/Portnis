import {by, element} from 'protractor';

export class RegisterPage {
  public emailInput = element(by.model('email'));
  public passwordInput = element(by.model('password'));
  public submitBtn = element(by.id('register'));
  public loginBtn = element(by.id('login-btn'));

  async createUser(email: string, password :string) {
    await this.emailInput.sendKeys(email);
    await this.passwordInput.sendKeys(password);
    await this.submitBtn.click();

    return email;
  }
}

export class LoginPage {
  public emailInput = element(by.model('email'));
  public passInput = element(by.model('password'));
  public loginBtn = element(by.id('login-btn'));
  public registerBtn = element(by.id('register'));

  async userLogin(email: string, pass: string) {
    await this.emailInput.sendKeys(email);
    await this.passInput.sendKeys(pass);
    await this.loginBtn.click();
  };
}