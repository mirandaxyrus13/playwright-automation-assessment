import { Page, Locator } from '@playwright/test';

export class Button {
    private readonly elementLocator: string;
    private readonly elementName: string;
    private readonly locator: Locator | undefined;

    constructor(
        protected readonly page: Page,
        elementName: string,
        elementLocator: string,
        locator?: Locator,
    ) {
        this.page = page;
        this.elementName = elementName;
        this.elementLocator = elementLocator;
        this.locator = locator;
    }

    /**
     * Clicks the target button using its configured locator.
     *
     * Waits for the button to become visible, focuses and hovers over it,
     * and then performs a click. If an operation fails, the function
     * retries until the configured number of attempts is exhausted.
     *
     * @returns A promise that resolves when the button is clicked successfully.
     * @throws {Error} If the button cannot be clicked after the retry attempts.
     *
     * @example
     * await this.clickButton();
     */
    public async clickButton(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).hover();
                await this.page.locator(this.elementLocator).click();

                console.info(this.elementName + ' Button is clicked');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Button is not displayed. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button is not displayed after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Button is not displayed after ' + attempts + ' attempts'
        );
    }

    /**
     * Clicks the target button using the optional Locator provided to the constructor.
     *
     * Waits for the button to become visible, focuses and hovers over it,
     * and then performs a click. If the operation fails, the function
     * retries and logs the error encountered during each failed attempt.
     *
     * Note: If no Locator was supplied to the constructor, optional chaining
     * prevents the locator operations from executing. The function may therefore
     * return without clicking anything.
     *
     * @returns A promise that resolves when the function completes.
     * @throws {Error} If a locator operation fails on all retry attempts.
     *
     * @example
     * await this.clickButtonV2();
     */
    public async clickButtonV2(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.locator?.waitFor({ state: 'visible' });
                await this.locator?.focus();
                await this.locator?.hover();
                await this.locator?.click();

                console.info(this.elementName + ' Button is clicked');
                return;
            } catch (e) {
                console.warn(
                    this.elementName +
                    ' Button click failed. Retrying... attempt: ' +
                    attempts +
                    '. Error: ' + String(e)
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button failed after ' + (attempts - 1) + ' attempts'
        );

        throw new Error(
            this.elementName + ' Button failed after ' + (attempts - 1) + ' attempts'
        );
    }

    /**
     * Double-clicks the target button.
     *
     * Waits for the button to become visible, focuses it, and performs
     * a double-click. If an operation fails, the function retries until
     * the configured number of attempts is exhausted.
     *
     * @returns A promise that resolves when the double-click succeeds.
     * @throws {Error} If the button cannot be double-clicked after the retry attempts.
     *
     * @example
     * await this.doubleClickButton();
     */
    public async doubleClickButton(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).dblclick();

                console.info(this.elementName + ' Button is clicked');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Button is not displayed. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button is not displayed after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Button is not displayed after ' + attempts + ' attempts'
        );
    }

    /**
     * Checks whether the target button is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true as soon
     * as the button is visible; otherwise, retries the check and returns false
     * after the retry loop finishes.
     *
     * @returns A promise that resolves to true if the button is visible,
     *          or false if it is not visible after the checks.
     *
     * @example
     * const isVisible = await this.isButtonVisible();
     */
    public async isButtonVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' Button is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Button is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Checks whether the target button is enabled.
     *
     * Waits three seconds before each enabled-state check. Returns true as soon
     * as the button is enabled; otherwise, retries the check and returns false
     * after the retry loop finishes.
     *
     * This method checks the enabled state only and does not explicitly
     * verify whether the button is visible.
     *
     * @returns A promise that resolves to true if the button is enabled,
     *          or false if it remains disabled after the checks.
     *
     * @example
     * const isEnabled = await this.isButtonEnabled();
     */
    public async isButtonEnabled(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isEnabled()) {
                console.info(
                    this.elementName + ' Button is enabled.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Button is not visible or enabled. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button is not visible or enabled after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute of the target button.
     *
     * Waits for the button to become visible, focuses it, and retrieves
     * its HTML class attribute. If an operation fails, the function retries
     * before throwing an error.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the button has no class attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const classValue = await this.getButtonClassAttributeValue();
     */
    public async getButtonClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' Button class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Button element and/or Button class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button element and/or Button class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Button element and/or Button class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute of the target button.
     *
     * Waits for the button to become visible, focuses it, and retrieves
     * its HTML ID attribute. If an operation fails, the function retries
     * before throwing an error.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the button has no ID attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const idValue = await this.getButtonIdAttributeValue();
     */
    public async getButtonIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' Button id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Button element and/or Button id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Button element and/or Button id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Button element and/or Button id attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the target button's bounding box.
     *
     * Waits for the button to become visible, focuses it, and retrieves
     * its position and dimensions relative to the page viewport. The returned
     * bounding box contains x, y, width, and height values.
     *
     * @returns A promise that resolves to the button's bounding box,
     *          or null if Playwright cannot determine its bounding box.
     * @throws {Error} If retrieving the bounding box fails after the retry attempts.
     *
     * @example
     * const boundingBox = await this.getButtonBounding();
     * console.log(boundingBox?.x, boundingBox?.y);
     */
    public async getButtonBounding(): Promise<ReturnType<Locator['boundingBox']> | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const boundBox = await this.page.locator(this.elementLocator).boundingBox();

                console.info(
                    this.elementName + ' Element is located in Bounded in this location: ' + JSON.stringify(boundBox)
                );

                return boundBox;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element is not visible after ' + attempts + ' attempts'
        );
    }
}