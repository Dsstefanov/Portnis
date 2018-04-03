import {browser} from 'protractor';

export class Urls {
  public static login = `${browser.baseUrl}/#/login`;
  public static register = `${browser.baseUrl}/#/register`;
  public static index = `${browser.baseUrl}/#/`;
}
