import { test, expect } from '../fixtures/fixtures'; 

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

test.describe('Module: Activity / Filters', () => {

    test.beforeEach(async ({ activityPage }) => {
        await test.step('Pre-condition: The user is on the Activity page and default event type checkboxes are checked', async () => {
            await activityPage.navigate(activityPage.PAGE_URL);
        });
    });

    test('TC-04: Filter activity feed by a specific "up to" date on the Activity page', async ({ activityPage }) => {
        const today = new Date();
        
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const targetDate = formatDate(yesterday);
        
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);
        const middleDate = formatDate(twoDaysAgo);

        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        const startDate = formatDate(threeDaysAgo);

        const expectedPeriodText = `From ${startDate} to ${targetDate}`;
        const allowedDatesInFeed = [targetDate, middleDate, startDate];

        await test.step(`Step 1: Click on the date input field in the "Activity" block on the right sidebar and select a specific date in the past (${targetDate})`, async () => {
            await activityPage.selectUpToDate(targetDate);
            await expect(activityPage.dateInput).toHaveValue(targetDate);
        });

        await test.step('Step 2: Click the "Apply" button', async () => {
            await activityPage.clickApply();
        });

        await test.step('Step 3: Verify the period information text under the main "Activity" header on the left side of the page', async () => {
            const actualPeriodText = await activityPage.getPeriodSubtitleText();
            expect(actualPeriodText, 'ERROR: The calculated period subtitle is incorrect!')
                .toContain(expectedPeriodText);
        });

        await test.step('Step 4: Verify the date group headers displayed in the main activity feed', async () => {
            const actualDateHeaders = await activityPage.getVisibleDateHeaders();
            if (actualDateHeaders.length === 0) {
                await expect(activityPage.noDataMessage, 'ERROR: Feed is empty but "No data" message is missing!')
                    .toBeVisible();
                test.skip(true, 'Valid system state: "No data to display" message is shown. Skipping to avoid false positive.');
                return; 
            }
            for (const headerDate of actualDateHeaders) {
                expect(allowedDatesInFeed, `ERROR: Found an extra date outside the 3-day window: ${headerDate}`)
                    .toContain(headerDate);
            }
        });
    });
});