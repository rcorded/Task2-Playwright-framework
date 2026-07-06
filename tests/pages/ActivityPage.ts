import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ActivityPage extends BasePage {
    readonly PAGE_URL = '/projects/redmine/activity';

    readonly dateInput: Locator;
    readonly applyBtn: Locator;
    readonly periodSubtitle: Locator;
    readonly dateGroupHeaders: Locator;

    constructor(page: Page) {
        super(page);        
        this.dateInput = page.locator('input#from');        
        this.applyBtn = page.locator('.sidebar input[type="submit"], input[value="Apply"]');        
        this.periodSubtitle = page.locator('#content > p').first();        
        this.dateGroupHeaders = page.locator('#content h3');
    }

    async selectUpToDate(dateStr: string) {
        await this.dateInput.click();        
        await this.dateInput.fill(dateStr);        
        await this.dateInput.press('Escape');
    }

    async clickApply() {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            this.applyBtn.click()                          
        ]);
    }

    async getPeriodSubtitleText(): Promise<string> {
        return (await this.periodSubtitle.innerText()).trim();
    }

    async getVisibleDateHeaders(): Promise<string[]> {
        const headers = await this.dateGroupHeaders.allInnerTexts();
        return headers.map(h => h.trim());
    }
}