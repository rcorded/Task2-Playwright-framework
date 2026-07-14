import { test, expect } from '../fixtures/fixtures'; 
import { ROADMAP_FILTER_TRACKERS } from '../data/constants';

test.describe('Module: Roadmap / Filters', () => {
    
    for (const tracker of ROADMAP_FILTER_TRACKERS) {
        test(`TC-03: Verify Issue Types Filtering Functionality on the Roadmap Page -> Uncheck "${tracker}"`, async ({ roadmapPage }) => {
            
            await test.step('Pre-condition: User is on the Roadmap page and default filters are applied', async () => {
                await roadmapPage.navigate(roadmapPage.PAGE_URL);                
                
                for (const defaultTracker of ROADMAP_FILTER_TRACKERS) {
                    await roadmapPage.setTrackerFilterState(defaultTracker, 'check');
                }
                await roadmapPage.clickApply();
            });

            await test.step(`Step 1: Uncheck the "${tracker}" checkbox and click the "Apply" button`, async () => {
                await roadmapPage.setTrackerFilterState(tracker, 'uncheck');
                await roadmapPage.clickApply();
            });

            await test.step(`Expected Result 1: The tasks with the corresponding "${tracker}" are no longer displayed in the "Related issues" list`, async () => {
                const visibleTrackers = await roadmapPage.getVisibleIssueTrackers();                
                expect(visibleTrackers, `ERROR: Tasks with type "${tracker}" are still displayed in the list!`)
                    .not.toContain(tracker);
            });

            await test.step('Expected Result 2: The tasks with other checked trackers remain visible', async () => {
                const visibleTrackers = await roadmapPage.getVisibleIssueTrackers();                
                const expectedTrackers = ROADMAP_FILTER_TRACKERS.filter(t => t !== tracker);                
                if (visibleTrackers.length === 0) {
                    test.skip(true, 'No other issues are available to verify remaining trackers.');
                    return;
                }
                for (const actualTracker of visibleTrackers) {
                    expect(expectedTrackers, `ERROR: Found an unexpected task type: ${actualTracker}`)
                        .toContain(actualTracker);
                }
            });
        });
    }
});