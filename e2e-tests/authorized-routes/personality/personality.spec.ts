import {LoginPage, RegisterPage} from "../../auth/login/auth.po";
import {PersonalityPage} from "./personality.po";
import {HomepageAuthorized} from "../homepage/homepage.po";
import {goToUrl, isUrl, waitForUrlToBe} from "../../common";
import {Urls} from "../../urls";
import {browser} from "protractor";

describe('The Personality page', () => {
  const user = {
    email: 'pesho@gmail.com',
    password: 'testpassword'
  };
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const personalityPage = new PersonalityPage();
  const homepageAuthorized = new HomepageAuthorized();

  beforeAll(async () => {
    await goToUrl(Urls.register);
    await registerPage.createUser(user.email, user.password);
    await waitForUrlToBe(Urls.login);
  });

  beforeEach(async () => {
    await browser.manage().deleteAllCookies();
    await goToUrl(Urls.login);
    await loginPage.userLogin(user.email, user.password);
    await waitForUrlToBe(Urls.index);
  });

  afterAll(async () => {
    await browser.manage().deleteAllCookies();
    await goToUrl(Urls.login);
    await loginPage.userLogin(user.email, user.password);
    await waitForUrlToBe(Urls.index);
    await browser.get(Urls.deleteUser);
    await waitForUrlToBe(Urls.login)
  });

  it('should check that all view elements are present', async() => {
    homepageAuthorized.personalityBtn.click();
    await waitForUrlToBe(Urls.personality);
    expect(personalityPage.nameInput.isPresent()).toBeTruthy();
    expect(personalityPage.usernameInput.isPresent()).toBeTruthy();
    expect(personalityPage.professionInput.isPresent()).toBeTruthy();
    expect(personalityPage.saveBtn.isPresent()).toBeTruthy();
  });

  it('should save the fields', async () => {
    homepageAuthorized.personalityBtn.click();
    await waitForUrlToBe(Urls.personality);
    await personalityPage.fillForm();
    expect(isUrl(Urls.index)).toBeTruthy();
  });
});
