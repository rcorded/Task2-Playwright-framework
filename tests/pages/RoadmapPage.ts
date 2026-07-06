import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RoadmapPage extends BasePage {
    readonly PAGE_URL = '/projects/redmine/roadmap';

    readonly applyBtn: Locator;
    readonly relatedIssuesBlocks: Locator;

    constructor(page: Page) {
        super(page);
        this.applyBtn = page.locator('input[value="Apply"]').first();
        this.relatedIssuesBlocks = page.locator('.related-issues');
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
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            this.applyBtn.click()                          
        ]);
    }

    async getAllVisibleIssuesText(): Promise<string> {
        const texts = await this.relatedIssuesBlocks.allInnerTexts();
        return texts.join(' ');
    }
}