import { Page } from '@playwright/test';

export class Dropdown {
    private readonly page: Page;
    private readonly elementName: string;
    private readonly elementLocator: string;
    private readonly elementSubLocator: string;

    constructor(
        page: Page,
        elementName: string,
        elementLocator: string,
        elementSubLocator: string = '',
    ) {
        this.page = page;
        this.elementName = elementName;
        this.elementLocator = elementLocator;
        this.elementSubLocator = elementSubLocator;
    }

    /**
     * Selects an option from a native dropdown using its visible text.
     *
     * Waits for the dropdown to become visible, focuses it, and selects
     * the option whose displayed label matches the provided text.
     * Retries the operation if an error occurs.
     *
     * @param text - The visible label of the dropdown option to select.
     * @returns A promise that resolves when the option is selected.
     * @throws {Error} If the dropdown or requested option cannot be selected
     *                 after the retry attempts.
     *
     * @example
     * await this.selectDropdownByText('Australia');
     */
    public async selectDropdownByText(text: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).selectOption({ label: text });

                console.info(this.elementName + ' Dropdown selected ' + text + ' text.');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Dropdown is not visible or text is not available in the dropdown. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown is not visible or text is not available in the dropdown after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Dropdown is not visible or text is not available in the dropdown after ' + attempts + ' attempts'
        );
    }

    /**
     * Selects an option from a native dropdown using its option value.
     *
     * Waits for the dropdown to become visible and focuses it before
     * selecting an option. The provided value is passed to Playwright's
     * selectOption() method.
     *
     * Note: This method currently passes the argument as a label rather
     * than as an option value. Use { value } to select by the HTML option
     * value attribute.
     *
     * @param value - The intended value of the dropdown option.
     * @returns A promise that resolves when the option is selected.
     * @throws {Error} If the dropdown or requested option cannot be selected
     *                 after the retry attempts.
     *
     * @example
     * await this.selectDropdownByValue('AU');
     */
    public async selectDropdownByValue(value: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).selectOption({ label: value });

                console.info(this.elementName + ' Dropdown selected ' + value + ' value.');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Dropdown is not visible or value is not available in the dropdown. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown is not visible or value is not available in the dropdown after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Dropdown is not visible or value is not available in the dropdown after ' + attempts + ' attempts'
        );
    }

    /**
     * Selects an option from a custom list box using its visible text.
     *
     * Waits for the list box to become visible, focuses and clicks it,
     * then waits for the option locator to match the provided text.
     * The option locator is constructed by replacing the word "value"
     * in the configured sub-locator with the supplied text.
     *
     * @param text - The visible text of the list-box option to select.
     * @returns A promise that resolves when the selection interaction completes.
     * @throws {Error} If the list box or requested option cannot be located
     *                 or interacted with after the retry attempts.
     *
     * @example
     * await this.selectListBox('Sydney, Australia');
     *
     * @example
     * // Example elementSubLocator:
     * // //li[@role="option" and normalize-space()="value"]
     */
    public async selectListBox(text: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).click({ force: true });
                await this.page.locator(this.elementSubLocator.replace('value', text)).waitFor();
                await this.page.locator(this.elementLocator).click({ force: true });

                console.info(this.elementName + ' ListBox selected ' + text + ' text.');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' ListBox is not visible or text is not available in the ListBox. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' ListBox is not visible or text is not available in the ListBox after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' ListBox is not visible or text is not available in the ListBox after ' + attempts + ' attempts'
        );
    }

    /**
     * Checks whether the target dropdown is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true as
     * soon as the dropdown is visible; otherwise, retries the check and
     * returns false when the retry loop finishes.
     *
     * @returns A promise that resolves to true if the dropdown is visible,
     *          or false if it is not visible after the checks.
     *
     * @example
     * const isVisible = await this.isDropdownVisible();
     */
    public async isDropdownVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' Dropdown is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Dropdown is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Checks whether the target dropdown is enabled.
     *
     * Waits three seconds before each enabled-state check. Returns true
     * as soon as the dropdown is enabled; otherwise, retries the check
     * and returns false when the retry loop finishes.
     *
     * This method checks the enabled state only and does not explicitly
     * verify whether the dropdown is visible.
     *
     * @returns A promise that resolves to true if the dropdown is enabled,
     *          or false if it remains disabled after the checks.
     *
     * @example
     * const isEnabled = await this.isDropdownEnabled();
     */
    public async isDropdownEnabled(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isEnabled()) {
                console.info(
                    this.elementName + ' Dropdown is enabled.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Dropdown is not visible or enabled. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown is not visible or enabled after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute of the target dropdown.
     *
     * Waits for the dropdown to become visible, focuses it, and retrieves
     * its HTML class attribute. Logs the retrieved value when successful.
     * If an operation fails, the function retries before throwing an error.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the dropdown has no class attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const classValue = await this.getDropdownClassAttributeValue();
     */
    public async getDropdownClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' Dropdown class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Dropdown element and/or Dropdown class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown element and/or Dropdown class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Dropdown element and/or Dropdown class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute of the target dropdown.
     *
     * Waits for the dropdown to become visible, focuses it, and retrieves
     * its HTML ID attribute. Logs the retrieved value when successful.
     * If an operation fails, the function retries before throwing an error.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the dropdown has no ID attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const idValue = await this.getDropdownIdAttributeValue();
     */
    public async getDropdownIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' Dropdown id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Dropdown element and/or Dropdown id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Dropdown element and/or Dropdown id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Dropdown element and/or Dropdown id attribute is not visible after ' + attempts + ' attempts'
        );
    }
}