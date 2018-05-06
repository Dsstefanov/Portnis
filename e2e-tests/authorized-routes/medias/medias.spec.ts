import {LoginPage, RegisterPage} from "../../auth/login/auth.po";
import {HomepageAuthorized} from "../homepage/homepage.po";
import {goToUrl, isUrl, waitForUrlToBe} from "../../common";
import {Urls} from "../../urls";
import {browser} from "protractor";
import {SocialMediasPage} from "./medias.po";

describe('The Personality page', () => {
  const user = {
    email: 'pesho@gmail.com',
    password: 'testpassword'
  };
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const mediasPage = new SocialMediasPage();
  const homepageAuthorized = new HomepageAuthorized();

  beforeAll(async () => {
    await browser.manage().deleteAllCookies();
    await goToUrl(Urls.register);
    await registerPage.createUser(user.email, user.password);
    await waitForUrlToBe(Urls.login);
    await loginPage.userLogin(user.email, user.password);
    await waitForUrlToBe(Urls.index);
  });

  beforeEach(async () => {
    await goToUrl(Urls.index);
    await waitForUrlToBe(Urls.index);
  });

  afterAll(async () => {
    await browser.get(Urls.deleteUser);
    await waitForUrlToBe(Urls.login);
  });

  it('should check that all view elements are present', async() => {
    homepageAuthorized.socialMediasBtn.click();
    await waitForUrlToBe(Urls.medias);
    expect(mediasPage.facebookInput.isPresent()).toBeTruthy();
    expect(mediasPage.linkedInInput.isPresent()).toBeTruthy();
    expect(mediasPage.githubInput.isPresent()).toBeTruthy();
    expect(mediasPage.saveBtn.isPresent()).toBeTruthy();
  });

  it('should save the fields', async () => {
    homepageAuthorized.socialMediasBtn.click();
    await waitForUrlToBe(Urls.medias);
    await mediasPage.fillForm();
    expect(isUrl(Urls.index)).toBeTruthy();
  });
});
