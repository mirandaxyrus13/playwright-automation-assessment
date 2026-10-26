import { Page, Locator } from '@playwright/test';

export class Element {
    private readonly page: Page;
    private readonly elementName: string;
    private readonly elementLocator: string;

    constructor(
        page: Page,
        elementName: string,
        elementLocator: string,
    ) {
        this.page = page;
        this.elementName = elementName;
        this.elementLocator = elementLocator;
    }

    /**
     * Clicks the target element using Playwright's forced-click option.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and performs a click while bypassing normal actionability checks.
     * Retries the operation if an error occurs.
     *
     * @returns A promise that resolves when the element is clicked successfully.
     * @throws {Error} If the element cannot be clicked after the retry attempts.
     *
     * @example
     * await this.clickElement();
     */
    public async clickElement(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).click({ force: true });

                console.info(this.elementName + ' Element is clicked');
                return;
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

    /**
     * Checks whether the target element is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true as
     * soon as the element is visible. Otherwise, retries the check and
     * returns false when the retry loop finishes.
     *
     * @returns A promise that resolves to true if the element is visible,
     *          or false if it is not visible after the checks.
     *
     * @example
     * const isVisible = await this.isElementVisible();
     */
    public async isElementVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' Element is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Element is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute of the target element.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML class attribute. Logs the retrieved value
     * when successful. Retries if an operation fails.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the element has no class attribute.
     * @throws {Error} If the class attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const classValue = await this.getDropdownClassAttributeValue();
     */
    public async getDropdownClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' Element class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element and/or Element class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element and/or Element class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element and/or Element class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute of the target element.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML ID attribute. Logs the retrieved value
     * when successful. Retries if an operation fails.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the element has no ID attribute.
     * @throws {Error} If the ID attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const idValue = await this.getDropdownIdAttributeValue();
     */
    public async getDropdownIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' Element id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element and/or Element id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element and/or Element id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element and/or Element id attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the target element's bounding box.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its position and dimensions relative to the viewport.
     * The bounding box contains x, y, width, and height properties.
     *
     * @returns A promise that resolves to the element's bounding box,
     *          or null if Playwright cannot determine its bounding box.
     * @throws {Error} If retrieving the bounding box fails after the retry attempts.
     *
     * @example
     * const boundingBox = await this.getElementBounding();
     * console.log(boundingBox?.x, boundingBox?.y);
     */
    public async getElementBounding(): Promise<ReturnType<Locator['boundingBox']> | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
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

    /**
     * Retrieves the text content of the target element.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its text content. Returns the text as provided by
     * Playwright, which may include whitespace or line breaks.
     *
     * @returns A promise that resolves to the element's text content,
     *          or null if the element has no text content.
     * @throws {Error} If the text content cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const elementText = await this.getElementText();
     * console.log(elementText);
     */
    public async getElementText(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const elementText = await this.page
                    .locator(this.elementLocator)
                    .textContent();

                console.info(
                    this.elementName + ' Element text is ' + elementText
                );

                return elementText;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element and/or Element text is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element and/or Element text is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element and/or Element text is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Counts the number of elements matching the configured locator.
     *
     * Waits three seconds before querying the page, then retrieves the
     * number of matching elements. The count includes matching elements
     * whether they are visible or hidden.
     *
     * @returns A promise that resolves to the number of matching elements.
     *          The declared return type also allows null, although this
     *          implementation returns a number or throws an error.
     * @throws {Error} If retrieving the element count fails after the retry attempts.
     *
     * @example
     * const elementCount = await this.getElementCount();
     * expect(elementCount).toBeGreaterThan(0);
     */
    public async getElementCount(): Promise<number | null> {
        let attempts = 1;

        do {
            try {
                await this.page.waitForTimeout(3000);
                await this.page.locator(this.elementLocator).all();

                const elementCount = await this.page
                    .locator(this.elementLocator)
                    .count();

                console.info(
                    this.elementName + ' Element count is ' + elementCount
                );

                return elementCount;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element/s is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element/s is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element/s is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Clicks every element matching the configured locator.
     *
     * Waits three seconds, retrieves the number of matching elements,
     * and clicks each match sequentially. Waits another three seconds
     * after each click. If no elements match, retries the operation.
     *
     * @returns A promise that resolves after all matching elements have
     *          been clicked, or immediately if no elements are found
     *          after the retry loop finishes.
     * @throws {Error} If an error prevents the operation from completing
     *                 after the retry attempts.
     *
     * @example
     * await this.clickElements();
     */
    public async clickElements(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.waitForTimeout(3000);
                await this.page.locator(this.elementLocator).all();

                const elementCount = await this.page
                    .locator(this.elementLocator)
                    .count();

                console.log(this.elementName + ' Element count: ' + elementCount);

                if (elementCount) {
                    for (let idx = 1; idx < elementCount + 1; idx++) {
                        this.page.locator(this.elementLocator).nth(idx - 1).click();

                        console.info(
                            this.elementName + ' Element number ' + Number(idx) + ' clicked'
                        );

                        await this.page.waitForTimeout(3000);
                    }

                    return;
                }
            } catch (e) {
                console.warn(
                    this.elementName + ' Element/s is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Element/s is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Element/s is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Clicks a specific element by replacing the VALUE placeholder in its locator.
     *
     * Replaces the literal string "VALUE" in the configured locator with
     * the supplied value, then clicks the resulting locator. Retries the
     * operation if the click fails.
     *
     * @param value - The text or value used to construct the specific element locator.
     * @returns A promise that resolves when the matching element is clicked.
     * @throws {Error} If the matching element cannot be clicked after the retry attempts.
     *
     * @example
     * // Example elementLocator:
     * // //div[@role="button" and @aria-label="VALUE"]
     * await this.clickSpecificElement('24 November, 2026');
     */
    public async clickSpecificElement(value: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator.replace('VALUE', value)).click();

                console.info(this.elementName + ' ' + value + ' Element is clicked');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Element is not visible. Retrying... attempt: ' + attempts
                );

                console.error('ERROR' + e);
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' ' + value + ' Element is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' ' + value + ' Element is not visible after ' + attempts + ' attempts'
        );
    }
}