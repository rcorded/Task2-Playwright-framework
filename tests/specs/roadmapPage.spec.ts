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
                const visibleText = await roadmapPage.getAllVisibleIssuesText();
                expect(visibleText, `ERROR: Tasks with type "${tracker}" are still displayed in the list!`)
                    .not.toContain(tracker);
            });
        });
    }
});