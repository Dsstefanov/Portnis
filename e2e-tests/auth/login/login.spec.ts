'use strict';
import {LoginPage, RegisterPage} from './auth.po';
import {browser, by, element} from 'protractor';
import {Urls} from '../../urls';
import {goToUrl, isUrl, waitForUrlToBe} from '../../common';
import {async} from "q";

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('The Sign Up page', () => {
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  beforeEach(async () => {
    await goToUrl(Urls.register);
  });
  it('should check that all view elements are present', () => {
    expect(registerPage.emailInput.isPresent()).toBeTruthy();
    expect(registerPage.passwordInput.isPresent()).toBeTruthy();
    expect(registerPage.submitBtn.isPresent()).toBeTruthy();
    expect(registerPage.loginBtn.isPresent()).toBeTruthy();
  });

  it('should navigate to the login page when sign in button is clicked', async () => {
    await registerPage.loginBtn.click();
    await waitForUrlToBe(Urls.login);
    expect(isUrl(Urls.login)).toBeTruthy();
  });

  it('should create a user and redirected to the login page', async () => {
    await registerPage.createUser(user.email, user.password);
    await waitForUrlToBe(Urls.login);
    expect(isUrl(Urls.login)).toBeTruthy();
  });

  afterAll(async () => {
    await loginPage.userLogin(user.email, user.password);
    await waitForUrlToBe(Urls.index);
    await browser.get(Urls.deleteUser);
    await waitForUrlToBe(Urls.login);
  })
});

describe('The login page', () => {
  const loginPage = new LoginPage();
  beforeAll(async () => {
    await goToUrl(Urls.register);
    const registerPage = new RegisterPage();
    await registerPage.createUser(user.email, user.password)
  });
  beforeEach(async () => {
    browser.manage().deleteAllCookies();
    await goToUrl(Urls.login);
  });

  afterAll(async() => {
    await browser.get(Urls.deleteUser);
    await waitForUrlToBe(Urls.login)
  });

  it('should contain login fields and submit button', () => {
    expect(loginPage.emailInput.isPresent()).toBeTruthy();
    expect(loginPage.passInput.isPresent()).toBeTruthy();
    expect(loginPage.loginBtn.isPresent()).toBeTruthy();
    expect(loginPage.registerBtn.isPresent()).toBeTruthy();
  });

  it('should navigate to the sign up page when sign up button is clicked', async () => {
    await loginPage.registerBtn.click();
    await waitForUrlToBe(Urls.register);
    expect(isUrl(Urls.register)).toBeTruthy();
  });

  it('should not log user in when password is wrong', async () => {
    await loginPage.userLogin(user.email, JSON.parse(JSON.stringify(user.password)).password+'test');
    expect(isUrl(Urls.login)).toBeTruthy();
  });

  it('should log the user in and redirect to the index page', async () => {
    await loginPage.userLogin(user.email, user.password);
    await waitForUrlToBe(Urls.index);
    expect(isUrl(Urls.index)).toBeTruthy();
  });
});
/*
describe('Log out', () => {
  it('should log the user out of the system', async () => {
    expect(browser.getCurrentUrl()).not.toContain('authentication');
    const userMenu = element(by.css('[aria-label="Open user menu"]'));
    expect(userMenu.isPresent()).toBeTruthy();
    await userMenu.click();

    await browser.sleep(500);

    const logoutBtn = element(by.css('[ng-click="logout()"]'));
    expect(logoutBtn.isPresent()).toBeTruthy();
    await logoutBtn.click();
    await waitForUrlToBe(Urls.login);
    expect(isUrl(Urls.login)).toBeTruthy();
  });
});
*/

const user = {
  email: 'pesho@gmail.com',
  password: 'testpassword'
};
