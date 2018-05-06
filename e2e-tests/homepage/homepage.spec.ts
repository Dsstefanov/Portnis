
import {getSimpleUser, goToUrl, waitForUrlToBe} from "../common";
import {Urls} from "../urls";
import {PersonalityPage} from "../authorized-routes/personality/personality.po";
import {Homepage} from "./homepage.po";
import {LoginPage, RegisterPage} from "../auth/login/auth.po";
import {HomepageAuthorized} from "../authorized-routes/homepage/homepage.po";
import {browser} from "protractor";
import {SocialMediasPage} from "../authorized-routes/medias/medias.po";
describe('The Home page', () => {

  const personalityPage = new PersonalityPage();
  const socialMediasPage = new SocialMediasPage();
  const homepage = new Homepage();
  const homepageAuthorized = new HomepageAuthorized();
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();

  beforeAll(async () => {
    await goToUrl(Urls.register);
    await registerPage.createUser(getSimpleUser().email, getSimpleUser().password);
    await waitForUrlToBe(Urls.login);
    await loginPage.userLogin(getSimpleUser().email, getSimpleUser().password);
    await waitForUrlToBe(Urls.index);
    homepageAuthorized.personalityBtn.click();
    await waitForUrlToBe(Urls.personality);
    await personalityPage.fillForm();
    await waitForUrlToBe(Urls.index);
    homepageAuthorized.socialMediasBtn.click();
    await waitForUrlToBe(Urls.medias);
    await socialMediasPage.fillForm(user.linkedIn, user.github);
    await waitForUrlToBe(Urls.index);
  });

  afterAll(async () => {
    await browser.get(Urls.deleteUser);
    await waitForUrlToBe(Urls.login)
  });

  it('should check that all view elements are present', async() => {
    await goToUrl(Urls.userHomepage(personalityPage.formValues.username));
    expect(homepage.nameText.isPresent()).toBeTruthy();
    expect(homepage.professionText.isPresent()).toBeTruthy();
    expect(homepage.githubBtn.isPresent()).toBeTruthy();
    expect(homepage.linkedInBtn.isPresent()).toBeTruthy();
  });

  it('should check that text boxes values are correct', async() => {
    await goToUrl(Urls.userHomepage(personalityPage.formValues.username));

    expect(await homepage.nameText.getText()).toBe(await personalityPage.formValues.name);
    expect(await homepage.professionText.getText()).toBe(await personalityPage.formValues.profession);
    expect(await homepage.linkedInBtn.getAttribute('href')).toMatch(user.linkedIn);
    expect(await homepage.githubBtn.getAttribute('href')).toMatch(user.github);
  });
});

const user = {
  email: 'pesho@gmail.com',
  password: 'testpassword',
  github: 'https://github.com/Dsstefanov',
  linkedIn: 'https://www.linkedin.com/in/dimitar-stefanov-0274b5125'
};