import {by, element} from 'protractor';

export class Homepage {
  public nameText = element(by.binding('user.name'));
  public professionText = element(by.binding('user.profession'));
  public githubBtn = element(by.id('github-btn'));
  public linkedInBtn = element(by.id('linkedIn-btn'));
}

