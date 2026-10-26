import { Page, Locator } from '@playwright/test';
import { Element } from 'src/core/web-elements/element';

export class SearchResultsPage {
    private page: Page;
    private readonly flightResultsListWrapper: Element;
    private readonly trackPricesLeftPanel: Element;
    private readonly compareVSCheapFlightsRightPanel: Element;
    private readonly searchedFlightResults: Element;

    constructor(page: Page) {
        this.page = page;
        this.flightResultsListWrapper = new Element(page, 'Flight Results List Wrapper', 'div#flight-results-list-wrapper');
        this.trackPricesLeftPanel = new Element(page, 'Cheap Flights Logo', 'div#leftRail div[aria-live="polite"][role="region"]');
        this.compareVSCheapFlightsRightPanel = new Element(page, 'Compare vs Cheapflights', '//div[text()="Compare vs Cheapflights"]//ancestor::div[contains(@class, "right-rail")]');
        this.searchedFlightResults = new Element(page, 'Searched Flight Results', '//div[contains(@class, "result-item-action")]//ancestor::div[@role="group" and @tabindex="-1" and starts-with(@aria-label, "Result item")]');
    }

    /**
     * Checks whether the flight results list wrapper is visible on the page.
     *
     * @returns A Promise that resolves to true if the flight results list wrapper
     * is visible; otherwise, false.
     */
    public async isFlightResultsListWrapperVisible(): Promise<boolean> {
        return await this.flightResultsListWrapper.isElementVisible();
    }

    /**
     * Checks whether the Track Prices panel on the left side of the page is visible.
     *
     * @returns A Promise that resolves to true if the Track Prices left panel
     * is visible; otherwise, false.
     */
    public async isTrackPricesLeftPanelVisible(): Promise<boolean> {
        return await this.trackPricesLeftPanel.isElementVisible();
    }

    /**
     * Checks whether the Compare vs Cheapflights panel on the right side
     * of the page is visible.
     *
     * @returns A Promise that resolves to true if the comparison panel
     * is visible; otherwise, false.
     */
    public async isCompareVSCheapFlightsRightPanelVisible(): Promise<boolean> {
        return await this.compareVSCheapFlightsRightPanel.isElementVisible();
    }

    /**
     * Checks whether any searched flight results exist on the page.
     *
     * Determines the number of elements matching the searched flight results
     * locator and returns whether at least one result exists.
     *
     * @returns A Promise that resolves to true if at least one flight result
     * exists; otherwise, false.
     */
    public async areFlightResultsVisible(): Promise<boolean> {
        const flightResults: number | null = await this.searchedFlightResults.getElementCount();
        return flightResults !== null && flightResults > 0;
    }
}