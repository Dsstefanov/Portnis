import {by, element} from "protractor";

export class SocialMediasPage{
  public facebookInput = element(by.model('user.socialMedias.facebook'));
  public linkedInInput = element(by.model('user.socialMedias.linkedIn'));
  public githubInput = element(by.model('user.socialMedias.github'));
  public saveBtn = element(by.id('save-btn'));

  async fillForm(linkedIn?, github?, facebook?){
    this.facebookInput.sendKeys(facebook ? facebook : this.formValues.facebook);
    this.linkedInInput.sendKeys(linkedIn ? linkedIn : this.formValues.linkedIn);
    this.githubInput.sendKeys(github ? github : this.formValues.github);
    this.saveBtn.click();
  }

  formValues = {
    facebook: 'https://www.facebook.com/dsstefanov',
    linkedIn: 'https://www.linkedin.com/in/dimitar-stefanov-0274b5125/',
    github: 'https://github.com/Dsstefanov'
  }
}