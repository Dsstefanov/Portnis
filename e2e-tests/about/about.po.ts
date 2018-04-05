import {by, element} from 'protractor';

export class AboutPage {
  public aboutText = element(by.binding('aboutText'));
  public skillBars = element(by.repeater('skill'));
}
