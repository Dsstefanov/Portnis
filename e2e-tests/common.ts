import {browser} from 'protractor';

export async function goToUrl(url: string) {
  await browser.get(url);
  await waitForUrlToBe(url);
}

export function isUrl(url: string) {
  return async () => {
    const actualUrl = await browser.getCurrentUrl();
    return url == actualUrl;
  };
}

export async function waitForUrlToBe(expectedUrl?: string) {
  const currentUrl = await browser.getCurrentUrl();
  await browser.wait(async () => {
    const url = await browser.getCurrentUrl();
    return expectedUrl ? expectedUrl == url : url != currentUrl;
  }, 7000, `Waiting for URL to change to ${expectedUrl} timed out`);
}

export function getSimpleUser(){
  return {
    email: 'pesho@gmail.com',
    password: 'testpassword'
  };
}