import { Page, Locator } from '@playwright/test';

export class CheckBox {
    private readonly elementLocator: string;
    private readonly elementName: string;

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
     * Checks the target checkbox if it is not already checked.
     *
     * Waits for the checkbox to become visible, focuses it, and checks
     * its current state before performing the check operation. If the
     * checkbox is already checked, no action is performed. The function
     * retries if an operation fails.
     *
     * @returns A promise that resolves when the checkbox is checked
     *          or is confirmed to be already checked.
     * @throws {Error} If the checkbox operation fails after the retry attempts.
     *
     * @example
     * await this.tickCheckBox();
     */
    public async tickCheckBox(): Promise<void> {
        let attempts = 1;

        do {
            try {
                const checkbox = this.page.locator(this.elementLocator);

                await checkbox.waitFor({ state: 'visible' });
                await checkbox.focus();

                // Check the checkbox only if it is not already checked
                if (!(await checkbox.isChecked())) {
                    await checkbox.check();
                    console.info(this.elementName + ' CheckBox is checked');
                } else {
                    console.info(this.elementName + ' CheckBox is already checked');
                }

                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' CheckBox is not displayed. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox is not displayed after ' + (attempts - 1) + ' attempts'
        );

        throw new Error(
            this.elementName + ' CheckBox is not displayed after ' + (attempts - 1) + ' attempts'
        );
    }

    /**
     * Unchecks the target checkbox if it is currently checked.
     *
     * Waits for the checkbox to become visible, focuses it, and checks
     * its current state before performing the uncheck operation. If the
     * checkbox is already unchecked, no action is performed. The function
     * retries if an operation fails.
     *
     * @returns A promise that resolves when the checkbox is unchecked
     *          or is confirmed to be already unchecked.
     * @throws {Error} If the checkbox operation fails after the retry attempts.
     *
     * @example
     * await this.untickCheckBox();
     */
    public async untickCheckBox(): Promise<void> {
        let attempts = 1;

        do {
            try {
                const checkbox = this.page.locator(this.elementLocator);

                await checkbox.waitFor({ state: 'visible' });
                await checkbox.focus();

                // Uncheck the checkbox only if it is currently checked
                if (await checkbox.isChecked()) {
                    await checkbox.uncheck();
                    console.info(this.elementName + ' CheckBox is unticked/unchecked');
                } else {
                    console.info(this.elementName + ' CheckBox is already unchecked');
                }

                return;
            } catch (e) {
                console.warn(
                    this.elementName +
                    ' CheckBox is not displayed. Retrying... attempt: ' +
                    attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName +
            ' CheckBox is not displayed after ' +
            (attempts - 1) +
            ' attempts'
        );

        throw new Error(
            this.elementName +
            ' CheckBox is not displayed after ' +
            (attempts - 1) +
            ' attempts'
        );
    }

    /**
     * Checks whether the target checkbox is checked.
     *
     * Waits three seconds before each check, waits for the checkbox to
     * become visible, and focuses it before checking its state. Returns
     * true when the checkbox is checked. Otherwise, retries the check
     * and returns false when the retry loop finishes.
     *
     * @returns A promise that resolves to true if the checkbox is checked,
     *          or false if it remains unchecked after the checks.
     *
     * @example
     * const isChecked = await this.isCheckBoxTicked();
     * expect(isChecked).toBe(true);
     */
    public async isCheckBoxTicked(): Promise<boolean> {
        let attempts = 0;

        do {
            await this.page.waitForTimeout(3000);
            await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
            await this.page.locator(this.elementLocator).focus();

            // Check whether the checkbox is checked
            if (await this.page.locator(this.elementLocator).isChecked()) {
                console.info(this.elementName + ' CheckBox is ticked/checked');
                return true;
            }

            console.warn(
                this.elementName + ' CheckBox is not ticked/checked or not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox is not ticked/checked or not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Checks whether the target checkbox is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true as
     * soon as the checkbox is visible. If it remains hidden, the function
     * retries the check and returns false after the retry loop finishes.
     *
     * @returns A promise that resolves to true if the checkbox is visible,
     *          or false if it is not visible after the checks.
     *
     * @example
     * const isVisible = await this.isCheckBoxVisible();
     */
    public async isCheckBoxVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' CheckBox is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' CheckBox is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Checks whether the target checkbox is enabled.
     *
     * Waits three seconds before each enabled-state check. Returns true
     * as soon as the checkbox is enabled. Otherwise, retries the check
     * and returns false after the retry loop finishes.
     *
     * This method checks the enabled state only and does not explicitly
     * verify whether the checkbox is visible.
     *
     * @returns A promise that resolves to true if the checkbox is enabled,
     *          or false if it remains disabled after the checks.
     *
     * @example
     * const isEnabled = await this.isCheckBoxEnabled();
     */
    public async isCheckBoxEnabled(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isEnabled()) {
                console.info(
                    this.elementName + ' CheckBox is enabled.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' CheckBox is not visible or enabled. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox is not visible or enabled after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute of the target checkbox.
     *
     * Waits for the checkbox to become visible, focuses it, and retrieves
     * its HTML class attribute. Logs the retrieved value when successful.
     * If an operation fails, the function retries before throwing an error.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the checkbox has no class attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const classValue = await this.getCheckBoxClassAttributeValue();
     */
    public async getCheckBoxClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' CheckBox class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' CheckBox element and/or CheckBox class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox element and/or CheckBox class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' CheckBox element and/or CheckBox class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute of the target checkbox.
     *
     * Waits for the checkbox to become visible, focuses it, and retrieves
     * its HTML ID attribute. Logs the retrieved value when successful.
     * If an operation fails, the function retries before throwing an error.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the checkbox has no ID attribute.
     * @throws {Error} If the attribute cannot be retrieved after the retry attempts.
     *
     * @example
     * const idValue = await this.getCheckBoxIdAttributeValue();
     */
    public async getCheckBoxIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor({ state: 'visible' });
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' CheckBox id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' CheckBox element and/or CheckBox id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' CheckBox element and/or CheckBox id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' CheckBox element and/or CheckBox id attribute is not visible after ' + attempts + ' attempts'
        );
    }
}