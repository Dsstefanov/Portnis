import {by, element} from "protractor";

export class PersonalityPage{
  public nameInput = element(by.model('user.name'));
  public usernameInput = element(by.model('user.username'));
  public professionInput = element(by.model('user.profession'));
  public saveBtn = element(by.id('save-btn'));

  async fillForm(){
    this.nameInput.sendKeys(this.formValues.name);
    this.usernameInput.sendKeys(this.formValues.username);
    this.professionInput.sendKeys(this.formValues.profession);
    this.saveBtn.click();
  }

  formValues = {
    name: 'Dimitar Stefanov',
    username: 'dsstefanov',
    profession: 'Web developer & Consultant'
  }
}