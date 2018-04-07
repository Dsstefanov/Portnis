import {by, element} from 'protractor';

export class Homepage {
  public nameText = element(by.binding('user.name'));
  public professionText = element(by.binding('user.profession'));
}

