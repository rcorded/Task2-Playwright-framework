import { test as baseTest } from '@playwright/test';
import { IssuesPage } from '../pages/IssuesPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { RoadmapPage } from '../pages/RoadmapPage';
import { ActivityPage } from '../pages/ActivityPage';

type PageObjectsFixtures = {
    issuesPage: IssuesPage;
    searchResultsPage: SearchResultsPage;
    roadmapPage: RoadmapPage;
    activityPage: ActivityPage;
};

export const test = baseTest.extend<PageObjectsFixtures>({
    
    issuesPage: async ({ page }, use) => {
        await use(new IssuesPage(page));
    },
    
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },

    roadmapPage: async ({ page }, use) => {
        await use(new RoadmapPage(page));
    },

    activityPage: async ({ page }, use) => {
        await use(new ActivityPage(page));
    }
});

export { expect } from '@playwright/test';

