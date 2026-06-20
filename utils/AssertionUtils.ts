import { expect, Locator, Page } from '@playwright/test';

export class AssertionUtils {

  static async elementIsVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  static async elementIsHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  static async elementHasText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  static async elementContainsText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  static async elementHasValue(locator: Locator, value: string) {
    await expect(locator).toHaveValue(value);
  }

  static async elementIsEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  static async elementIsDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  static async urlContains(page: Page, url: string) {
    await expect(page).toHaveURL(new RegExp(url));
  }

  static async urlEquals(page: Page, url: string) {
    await expect(page).toHaveURL(url);
  }

  static async titleEquals(page: Page, title: string) {
    await expect(page).toHaveTitle(title);
  }
}