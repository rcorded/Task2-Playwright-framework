import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RoadmapPage extends BasePage {
    readonly PAGE_URL = '/projects/redmine/roadmap';
    readonly applyBtn: Locator;
    readonly relatedIssuesBlocks: Locator;
    readonly issueLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.applyBtn = page.locator('input[value="Apply"]').first();
        this.relatedIssuesBlocks = page.locator('.related-issues');
        this.issueLinks = page.locator('table.related-issues td.subject a');
    }

    getTrackerCheckbox(trackerName: string): Locator {
        return this.page.locator('label', { hasText: trackerName }).locator('input[type="checkbox"]');
    }

    async setTrackerFilterState(trackerName: string, state: 'check' | 'uncheck') {
        const checkbox = this.getTrackerCheckbox(trackerName);
        if (state === 'check') {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }
    }

    async clickApply() {
        await this.applyBtn.click()  
        await this.page.waitForURL(`**${this.PAGE_URL}**`);                                     
    }

    async getVisibleIssueTrackers(): Promise<string[]> {
        const rawTexts = await this.issueLinks.allInnerTexts();        
        return rawTexts.map(text => {
            return text.split(' #')[0].trim();
        });
    }
}