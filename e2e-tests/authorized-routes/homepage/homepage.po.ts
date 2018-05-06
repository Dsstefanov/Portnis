import {by, element} from 'protractor';

export class HomepageAuthorized {
  public personalityBtn = element(by.id('personality'));
  public socialMediasBtn = element(by.id('social-medias'));
}