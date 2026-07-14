import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class IssuesPage extends BasePage {
    readonly PAGE_URL = '/projects/redmine/issues';

    // OPTIONS
    readonly optionsLegend: Locator;
    readonly availableColumnsSelect: Locator;
    readonly selectedColumnsSelect: Locator;
    readonly moveRightBtn: Locator;
    readonly moveLeftBtn: Locator;

    // FILTERS
    readonly filtersLegend: Locator;
    readonly statusCheckbox: Locator;
    readonly statusOperatorSelect: Locator;
    readonly statusValueSelect: Locator;
    readonly clearBtn: Locator;

    readonly applyBtn: Locator;
    readonly tableHeaders: Locator;
    readonly statusCells: Locator;
    readonly firstIssueSubject: Locator;
    
    constructor(page: Page) {
        super(page);
        this.applyBtn = page.locator('.icon-checked', { hasText: 'Apply' });
        this.tableHeaders = page.locator('table.issues thead th');
        this.statusCells = page.locator('table.issues tbody td.status');
        this.firstIssueSubject = page.locator('table.issues tbody tr').first().locator('td.subject a');

        // OPTIONS
        this.optionsLegend = page.locator('legend', { hasText: 'Options' });
        this.availableColumnsSelect = page.locator('#available_c');
        this.selectedColumnsSelect = page.locator('#selected_c');
        this.moveRightBtn = page.locator('input[value="→"]');
        this.moveLeftBtn = page.locator('input[value="←"]');
        
        // FILTERS
        this.filtersLegend = page.locator('legend', { hasText: 'Filters' });
        this.statusCheckbox = page.locator('#cb_status_id');
        this.statusOperatorSelect = page.locator('#operators_status_id');
        this.statusValueSelect = page.locator('#values_status_id_1');
        this.clearBtn = page.locator('.icon-reload', { hasText: 'Clear' });
    }

    async expandOptions() {
        if (!(await this.availableColumnsSelect.isVisible())) {
            await this.optionsLegend.click();
            await this.availableColumnsSelect.waitFor({ state: 'visible' });
        }
    }

    async setColumns(columnsToSelect: string[]) {
        const currentSelected = await this.selectedColumnsSelect.locator('option').allInnerTexts();
        if (currentSelected.length > 0) {
            await this.selectedColumnsSelect.selectOption(currentSelected);
            await this.moveLeftBtn.click();
        }
        for (const columnName of columnsToSelect) {
            await this.availableColumnsSelect.selectOption({ label: columnName });
            await this.moveRightBtn.click();
        }
    }

    async getTableHeadersTexts(): Promise<string[]> {
        const headers = await this.tableHeaders.allInnerTexts();
        return headers.map(header => header.trim()).filter(header => header !== '');
    }

    async expandFilters() {
        if (!(await this.statusCheckbox.isVisible())) {
            await this.filtersLegend.click();
            await this.statusCheckbox.waitFor({ state: 'visible' });
        }
    }

    async setStatusFilter(operator: string, value: string) {
        const isChecked = await this.statusCheckbox.isChecked();
        if (!isChecked) {
            await this.statusCheckbox.check();
        }
        await this.statusOperatorSelect.selectOption({ label: operator });
        await this.statusValueSelect.selectOption({ label: value });
    }

    async getVisibleStatuses(): Promise<string[]> {
        return await this.statusCells.allInnerTexts();
    }

    async clickApply() {
        await this.applyBtn.click();  
        await this.page.waitForURL(`**${this.PAGE_URL}**`);                        
    }

    async clickClear() {
        await this.clearBtn.click(); 
        await this.page.waitForURL(`**${this.PAGE_URL}**`);                        
    }

    async getFirstIssueSubjectText(): Promise<string> {
        const subjectText = await this.firstIssueSubject.innerText();
        return subjectText.trim();
    }
}