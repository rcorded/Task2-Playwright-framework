import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly globalSearchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.globalSearchInput = page.locator('input#q');
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async fillGlobalSearch(query: string) {
        await this.globalSearchInput.fill(query);
    }

    async pressEnterInGlobalSearch() {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            this.globalSearchInput.press('Enter')           
        ]);
    }
}