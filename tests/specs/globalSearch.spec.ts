import { test, expect } from '../fixtures/fixtures'; 

test.describe('Module: Global Search', () => {
    
    test('TC-05: Search for an existing issue using dynamic data reading', async ({ page, issuesPage, searchResultsPage }) => {        
        let savedIssueTitle = '';

        await test.step('Pre-condition: The user is on the issues list page', async () => {
            await issuesPage.navigate(issuesPage.PAGE_URL);
        });

        await test.step('Step 1: Read and save the title (Subject) of the first issue in the list', async () => {
            savedIssueTitle = await issuesPage.getFirstIssueSubjectText();            
            expect(savedIssueTitle.length, 'ERROR: Failed to read the issue title (string is empty)')
                .toBeGreaterThan(0);
        });

        await test.step('Step 2: Enter the saved title into the global search input field (in the top right corner)', async () => {
            await issuesPage.fillGlobalSearch(savedIssueTitle);
            await expect(issuesPage.globalSearchInput).toHaveValue(savedIssueTitle);
        });

        await test.step('Step 3: Press the Enter key (or click the search icon)', async () => {
            await issuesPage.pressEnterInGlobalSearch();
            await expect(page).toHaveURL(searchResultsPage.PAGE_URL_REGEX);            
        });

        await test.step('Step 4: Verify the headers of the search results', async () => {
            const resultTitles = await searchResultsPage.getResultTitles();
            expect(resultTitles.length, 'ERROR: Search results list is empty').toBeGreaterThan(0);
            const isTextFound = resultTitles.some(title => 
                title.toLowerCase().includes(savedIssueTitle.toLowerCase())
            );
            expect(isTextFound, `ERROR: No search result contains the searched text: "${savedIssueTitle}"`)
                .toBeTruthy();
        });
    });
});