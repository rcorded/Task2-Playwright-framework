import { test, expect } from '../fixtures/fixtures'; 
import { ISSUE_FILTER_STATUSES, ISSUES_TABLE_COLUMNS } from '../data/constants';


test.describe('Module: Issues', () => {
    test.beforeEach(async ({ issuesPage }) => {
        await test.step('Precondition: Navigate to the Issues page', async () => {
            await issuesPage.navigate(issuesPage.PAGE_URL);
        });
    });

    test.describe('Issues / Filters', () => {
        for (const status of ISSUE_FILTER_STATUSES) {
            test(`TC-02: Verify Issue Filtering by "Status" (operator: "is") on the Issue Page -> ${status}`, async ({ page, issuesPage }) => {
                await test.step('Step 1: Expand the Filters block', async () => {
                    await issuesPage.expandFilters();
                });

                await test.step(`Step 2-4: Check the Status checkbox, select "is" operator, and select value "${status}"`, async () => {
                    await issuesPage.setStatusFilter('is', status);
                });

                await test.step('Step 5: Click the "Apply" button', async () => {
                    await issuesPage.clickApply();
                });

                await test.step('Expected Result: Every row in the "Status" column matches the selected <Status>', async () => {
                    const displayedStatuses = await issuesPage.getVisibleStatuses();
                    for (let i = 0; i < displayedStatuses.length; i++) {
                        expect.soft(displayedStatuses[i].trim(), `ERROR: Row ${i + 1} has incorrect status`)
                            .toBe(status);
                    }
                });

                await test.step('Post-condition: Clear filters', async () => {
                    await issuesPage.clickClear();
                });
            });
        }
    });

    test.describe('Issues / Options', () => {
        test('TC-01: Verify the display of selected columns in the issues table on the Issue Page', async ({ page, issuesPage }) => {
            await test.step('Step 1: In the "Options" block, configure a unique set of columns in the Selected Columns box', async () => {
                await issuesPage.expandOptions();
                await issuesPage.setColumns(ISSUES_TABLE_COLUMNS);

            });

            await test.step('Step 2: Click the "Apply" button', async () => {
                await issuesPage.clickApply();
            });

            await test.step('Expected Result: Verify table headers match selected columns', async () => {
                const actualHeaders = await issuesPage.getTableHeadersTexts();
                expect(actualHeaders[0], 'ERROR: The first column should be "#" (Task ID)')
                    .toBe('#');
                const actualUserColumns = actualHeaders.slice(1);
                expect(actualUserColumns, 'ERROR: Displayed columns do not match the selected configuration')
                    .toEqual(ISSUES_TABLE_COLUMNS);
            });
        });
    });
});