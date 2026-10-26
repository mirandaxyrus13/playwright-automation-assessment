import { Page } from '@playwright/test';

export class Link {
    private readonly elementName: string;
    private readonly elementLocator: string;

    constructor(
        protected readonly page: Page,
        elementName: string,
        elementLocator: string,
    ) {
        this.page = page;
        this.elementName = elementName;
        this.elementLocator = elementLocator;
    }

    /**
     * Clicks the target link using Playwright's forced-click option.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and clicks it while bypassing normal actionability checks.
     * Retries the operation if an error occurs.
     *
     * @returns A promise that resolves when the link is clicked successfully.
     * @throws {Error} If the link cannot be clicked after the retry attempts.
     *
     * @example
     * await profileLink.clickLink();
     */
    public async clickLink(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).click({ force: true });

                console.info(this.elementName + ' Link is clicked');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' Link is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Link is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Checks whether the target link is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true
     * as soon as the link is visible. Otherwise, retries the check and
     * returns false when the retry loop finishes.
     *
     * @returns A promise that resolves to true if the link is visible,
     *          or false if it is not visible after the checks.
     *
     * @example
     * const isVisible = await profileLink.isLinkVisible();
     */
    public async isLinkVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' Link is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Link is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Checks whether the target link is enabled.
     *
     * Waits three seconds before each enabled-state check. Returns true
     * as soon as the link is enabled. Otherwise, retries the check and
     * returns false when the retry loop finishes.
     *
     * This method checks the enabled state only and does not explicitly
     * verify whether the link is visible.
     *
     * @returns A promise that resolves to true if the link is enabled,
     *          or false if it remains disabled after the checks.
     *
     * @example
     * const isEnabled = await profileLink.isLinkEnabled();
     */
    public async isLinkEnabled(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isEnabled()) {
                console.info(
                    this.elementName + ' Link is enabled.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' Link is not visible or enabled. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link is not visible or enabled after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute value of the target link.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML class attribute. Logs the value on success
     * and retries if an operation fails.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the link has no class attribute.
     * @throws {Error} If the class attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const classValue = await profileLink.getLinkClassAttributeValue();
     */
    public async getLinkClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' Link class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Link element and/or Link class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link element and/or Link class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Link element and/or Link class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute value of the target link.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML ID attribute. Logs the value on success
     * and retries if an operation fails.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the link has no ID attribute.
     * @throws {Error} If the ID attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const idValue = await profileLink.getLinkIdAttributeValue();
     */
    public async getLinkIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' Link id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Link element and/or Link id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link element and/or Link id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Link element and/or Link id attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the href attribute value of the target link.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML href attribute, which typically specifies
     * the link's destination URL. Logs the value on success and retries
     * if an operation fails.
     *
     * @returns A promise that resolves to the href attribute value,
     *          or null if the link has no href attribute.
     * @throws {Error} If the href attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const hrefValue = await profileLink.getLinkHrefAttributeValue();
     */
    public async getLinkHrefAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('href');

                console.info(
                    this.elementName + ' Link href attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' Link element and/or Link href attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' Link element and/or Link href attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' Link element and/or Link href attribute is not visible after ' + attempts + ' attempts'
        );
    }
}