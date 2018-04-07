import {browser} from 'protractor';

export class Urls {
  public static login = `${browser.baseUrl}/#/login`;
  public static register = `${browser.baseUrl}/#/register`;
  public static index = `${browser.baseUrl}/#/`;
  public static personality = `${browser.baseUrl}/#/personality`;
  public static deleteUser = `${browser.baseUrl}/#/users/delete`;

  public static aboutPage(username :string){
    return `${browser.baseUrl}/#/${username}/about`
  }
  public static userHomepage(username :string){
    return `${browser.baseUrl}/#/${username}`
  }


}
