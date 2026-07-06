import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    readonly PAGE_URL_REGEX = /.*\/search/;

    readonly searchResultsContainer: Locator;
    readonly resultItems: Locator;

    constructor(page: Page) {
        super(page);
        this.searchResultsContainer = page.locator('#search-results');
        this.resultItems = this.searchResultsContainer.locator('dt');
    }

    async getResultTitles(): Promise<string[]> {
        return await this.resultItems.allInnerTexts();
    }
}