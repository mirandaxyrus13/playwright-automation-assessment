
import { Page, Locator } from '@playwright/test';
import { Element } from 'src/core/web-elements/element';
import { Link } from 'src/core/web-elements/link';
import { Button } from 'src/core/web-elements/button';
import { ENV } from 'src/config/env';
import { TextBox } from 'src/core/web-elements/textbox';
import { CheckBox } from 'src/core/web-elements/checkbox';

export class MainPage  {
    private page: Page;
    private readonly flightsButton: Button;
    private readonly cheapFlightsLogoElement: Element;
    private readonly cheapFlightsLogoLink: Link;
    private readonly signInButton: Button;
    private readonly removeFromToIcon: Element; 
    private readonly fromTextBox: TextBox;
    private readonly toTextBox: TextBox;
    private readonly askAnything: TextBox;
    private readonly locationPopover: Element;
    private readonly dateButton: Button;
    private readonly fromToDateButton: Element;
    private readonly calendarModal: Element;
    private readonly travelersButton: Button;
    private readonly travellersPopover: Element;
    private readonly searchFlightsButton: Button;
    private readonly compareCheapFlightsVSBookingComCheckbox: CheckBox;

    constructor(page: Page) {
        this.page = page;
        this.flightsButton = new Button(page, 'Flights', '//a[@aria-label="Search for flights"]//parent::li');
        this.cheapFlightsLogoElement = new Element(page, 'Cheap Flights Logo', 'a.gPDR-main-logo-link');
        this.cheapFlightsLogoLink = new Link(page, 'Cheap Flights Logo', 'a.gPDR-main-logo-link');
        this.signInButton = new Button(page, 'Sign In','div[aria-label="Sign in"]');
        this.removeFromToIcon = new Element(page, 'Remove From/To Icon', 'div[role="listitem"] div[aria-label="Remove value"]');
        this.fromTextBox = new TextBox(page, 'From', 'input[aria-label="Origin location"]');
        this.toTextBox = new TextBox(page, 'To', 'input[aria-label="Destination location"]');
        this.locationPopover = new Element(page, 'Location Popover', '//div[@aria-hidden="false" and @tabindex="-1"]');
        this.askAnything = new TextBox(page, 'Location Popover', 'input[aria-label="Ask anything"]');
        this.dateButton = new Button(page, 'Date', '//span[text()="Departure"]//ancestor::div[@role="button"]');
        this.fromToDateButton = new Element(page, 'From / To Dates', '//div[@role="button" and starts-with(@aria-label, "VALUE")]//parent::td');
        this.calendarModal = new Element(page, 'Calendar Modal', 'div.sGVi-dropdown-content');
        this.travelersButton = new Button(page, 'Travelers', '//div[contains(@class, "travelers")]//ancestor::div[@role="button"]');
        this.travellersPopover = new Element(page, 'Travellers Popover', '//div[contains(text(), "Travellers")]//ancestor::div[contains(@class, "content")]');
        this.searchFlightsButton = new Button(page, 'Search Flights', '//button[@aria-label="Search"]//parent::div', this.page.getByRole('button', { name: 'Search' }));
        this.compareCheapFlightsVSBookingComCheckbox = new CheckBox(page, 'Compare Cheapflights vs Booking.com', '//input[starts-with(@id, "pres-default") and @type="checkbox"]');
    }

    /**
     * Navigates to the Cheapflights AU website using the configured base URL.
     *
     * @returns A Promise that resolves when the navigation completes.
     */
    public async navigateToCheapFlightsAU(): Promise<void> {
        await this.page.goto(ENV.UI_BASE_URL);
    }

    /**
     * Clicks the Flights button to access the flight search page.
     *
     * @returns A Promise that resolves when the button interaction completes.
     */
    public async clickFlights(): Promise<void> {
        await this.flightsButton.clickButton();
    }

    /**
     * Checks whether the Cheapflights logo is visible on the page.
     *
     * @returns A Promise that resolves to true if the logo is visible;
     * otherwise, false.
     */
    public async isCheapFlightsLogoVisible(): Promise<boolean> {
        return await this.cheapFlightsLogoElement.isElementVisible();
    }

    /**
     * Retrieves the bounding box of the Cheapflights logo element.
     *
     * @returns A Promise that resolves to the element's bounding box,
     * or null if the element has no visible bounding box.
     */
    public async getCheapFlightsLogoElementPosition() {
        return await this.cheapFlightsLogoElement.getElementBounding();
    }

    /**
     * Checks whether the Sign In button is visible on the page.
     *
     * @returns A Promise that resolves to true if the Sign In button is visible;
     * otherwise, false.
     */
    public async isSignInButtonVisible(): Promise<boolean> {
        return await this.signInButton.isButtonVisible();
    }

    /**
     * Retrieves the bounding box of the Sign In button.
     *
     * @returns A Promise that resolves to the button's bounding box,
     * or null if the button has no visible bounding box.
     */
    public async getSignInButtonPosition(): Promise<ReturnType<Locator['boundingBox']> | null> {
        return await this.signInButton.getButtonBounding();
    }

    /**
     * Clicks the Sign In button to open the sign-in interface.
     *
     * @returns A Promise that resolves when the button interaction completes.
     */
    public async clickSignIn(): Promise<void> {
        await this.signInButton.clickButton();
    }

    /**
     * Clicks the Cheapflights logo link, typically navigating to the website's
     * home page.
     *
     * @returns A Promise that resolves when the link interaction completes.
     */
    public async clickCheapFlightsLogo(): Promise<void> {
        await this.cheapFlightsLogoLink.clickLink();
    }

    /**
     * Clicks the controls used to remove the current origin and destination
     * location values from the flight search form.
     *
     * @returns A Promise that resolves when the removal interaction completes.
     */
    public async removeFromToLocations(): Promise<void> {
        await this.removeFromToIcon.clickElements();
    }

    /**
     * Enters the origin location and confirms the selection using the Enter key.
     *
     * @param from - The departure city, airport, or origin location to enter.
     * @returns A Promise that resolves when the location entry and confirmation
     * interaction complete.
     */
    public async enterFrom(from: string): Promise<void> {
        await this.fromTextBox.enterText(from);
        await this.locationPopover.isElementVisible();
        await this.page.keyboard.press('Enter');
    }

    /**
     * Enters the destination location and confirms the selection using the Enter key.
     *
     * @param to - The arrival city, airport, or destination location to enter.
     * @returns A Promise that resolves when the location entry and confirmation
     * interaction complete.
     */
    public async enterTo(to: string): Promise<void> {
        await this.toTextBox.enterText(to);
        await this.locationPopover.isElementVisible();
        await this.page.keyboard.press('Enter');
    }

    /**
     * Enters a query into the Ask Anything field and confirms it using
     * the Enter key.
     *
     * @param askAnything - The query or location text to enter.
     * @returns A Promise that resolves when the text entry and confirmation
     * interaction complete.
     */
    public async enterAskAnything(askAnything: string): Promise<void> {
        await this.askAnything.enterText(askAnything);
        await this.locationPopover.isElementVisible();
        await this.page.keyboard.press('Enter');
    }

    /**
     * Opens the date picker, selects the departure and return dates,
     * and closes the calendar using the Escape key.
     *
     * @param fromDate - The departure date to select, in the format expected
     * by the date picker locator.
     * @param toDate - The return date to select, in the format expected
     * by the date picker locator.
     * @returns A Promise that resolves when the date selection interactions
     * complete.
     */
    public async selectDates(fromDate: string, toDate: string): Promise<void> {
        await this.dateButton.clickButton();
        await this.calendarModal.isElementVisible();
        await this.fromToDateButton.clickSpecificElement(fromDate);
        await this.fromToDateButton.clickSpecificElement(toDate);
        await this.page.keyboard.press('Escape');
    }

    /**
     * Clicks the Travelers button to open the passenger selection popover.
     *
     * @returns A Promise that resolves when the button interaction completes.
     */
    public async clickTravelers(): Promise<void> {
        await this.travelersButton.clickButton();
    }

    /**
     * Checks whether the Travelers popover is visible.
     *
     * @returns A Promise that resolves to true if the popover is visible;
     * otherwise, false.
     */
    public async isTravellersModalVisible(): Promise<boolean> {
        return await this.travellersPopover.isElementVisible();
    }

    /**
     * Clicks the Search button to submit the flight search criteria.
     *
     * @returns A Promise that resolves when the search button interaction
     * completes.
     */
    public async clickSearchFlights(): Promise<void> {
        // await this.page.getByRole('button', { name: 'Search' }).click();
        await this.searchFlightsButton.clickButtonV2();
    }

    /**
     * Ensures the Compare Cheapflights vs Booking.com checkbox is unchecked.
     * If the checkbox is already unchecked, no state change is required.
     *
     * @returns A Promise that resolves when the checkbox is confirmed unchecked.
     */
    public async uncheckCompareCheapflightsVSBookingCom(): Promise<void> {
        await this.compareCheapFlightsVSBookingComCheckbox.untickCheckBox();
    }
}
