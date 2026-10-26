import { Page } from '@playwright/test';

export class TextBox {
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
     * Enters text into the target textbox by simulating sequential keyboard input.
     *
     * Waits for the element to be attached to the DOM, focuses the textbox,
     * clears any existing text, and types the supplied text with a
     * 50-millisecond delay between keystrokes.
     *
     * Retries the operation if an error occurs.
     *
     * @param text - The text to enter into the textbox.
     * @returns A promise that resolves when the text has been entered successfully.
     * @throws {Error} If the text cannot be entered after the retry attempts.
     *
     * @example
     * await usernameTextBox.enterText('Testing123');
     */
    public async enterText(text: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).clear();

                await this.page.locator(this.elementLocator).pressSequentially(text, {
                    delay: 50,
                });

                console.info(this.elementName + ' TextBox is populated with ' + text);
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Enters sensitive text into the target textbox while masking it in logs.
     *
     * Waits for the element to be attached to the DOM, focuses the textbox,
     * clears any existing text, and types the supplied text with a
     * 100-millisecond delay between keystrokes.
     *
     * Logs a masked value instead of the actual text to help protect
     * sensitive information from appearing in console output.
     *
     * @param text - The sensitive text to enter into the textbox.
     * @returns A promise that resolves when the text has been entered successfully.
     * @throws {Error} If the text cannot be entered after the retry attempts.
     *
     * @example
     * await passwordTextBox.enterSecret('MySecretPassword');
     */
    public async enterSecret(text: string): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).clear();

                await this.page.locator(this.elementLocator).pressSequentially(text, {
                    delay: 100,
                });

                console.info(this.elementName + ' TextBox is populated with *******');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Checks whether the target textbox is visible on the page.
     *
     * Waits three seconds before each visibility check. Returns true as soon
     * as the textbox is visible. Otherwise, retries the check and returns
     * false when the retry loop finishes.
     *
     * @returns A promise that resolves to true if the textbox is visible,
     *          or false if it remains hidden after the checks.
     *
     * @example
     * const isVisible = await usernameTextBox.isTextboxVisible();
     * console.log(isVisible);
     */
    public async isTextboxVisible(): Promise<boolean> {
        let attempts = 1;

        do {
            await this.page.waitForTimeout(3000);

            if (await this.page.locator(this.elementLocator).isVisible()) {
                console.info(
                    this.elementName + ' TextBox is visible.'
                );
                return true;
            }

            console.warn(
                this.elementName + ' TextBox is not visible. Retrying... attempt: ' + attempts
            );

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );

        return false;
    }

    /**
     * Retrieves the class attribute value of the target textbox.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML class attribute. Logs the retrieved value
     * on success and retries if an operation fails.
     *
     * @returns A promise that resolves to the class attribute value,
     *          or null if the element has no class attribute.
     * @throws {Error} If the class attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const classValue =
     *     await usernameTextBox.getTextBoxClassAttributeValue();
     */
    public async getTextBoxClassAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('class');

                console.info(
                    this.elementName + ' TextBox class attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox element and/or TextBox class attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox element and/or TextBox class attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox element and/or TextBox class attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the ID attribute value of the target textbox.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its HTML ID attribute. Logs the retrieved value
     * on success and retries if an operation fails.
     *
     * @returns A promise that resolves to the ID attribute value,
     *          or null if the element has no ID attribute.
     * @throws {Error} If the ID attribute cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const idValue =
     *     await usernameTextBox.getTextBoxIdAttributeValue();
     */
    public async getTextBoxIdAttributeValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const attributeValue = await this.page
                    .locator(this.elementLocator)
                    .getAttribute('id');

                console.info(
                    this.elementName + ' TextBox id attribute value is ' + attributeValue
                );

                return attributeValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox element and/or TextBox id attribute is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox element and/or TextBox id attribute is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox element and/or TextBox id attribute is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Retrieves the current input value of the target textbox.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and retrieves its current value using Playwright's inputValue().
     *
     * @returns A promise that resolves to the current input value.
     *          The declared return type also allows null, although
     *          inputValue() returns a string when successful.
     * @throws {Error} If the input value cannot be retrieved after
     *                 the retry attempts.
     *
     * @example
     * const inputValue =
     *     await usernameTextBox.getTextBoxInputValue();
     * console.log(inputValue);
     */
    public async getTextBoxInputValue(): Promise<string | null> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();

                const inputValue = await this.page
                    .locator(this.elementLocator)
                    .inputValue();

                console.info(
                    this.elementName + ' TextBox input value is ' + inputValue
                );

                return inputValue;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );
    }

    /**
     * Focuses the target textbox and clicks it.
     *
     * Waits for the element to be attached to the DOM, focuses it,
     * and performs a click. Logs a success message when these operations
     * complete. Retries if an operation fails.
     *
     * @returns A promise that resolves when the focus and click operations
     *          complete successfully.
     * @throws {Error} If the textbox cannot be focused and clicked after
     *                 the retry attempts.
     *
     * @example
     * await usernameTextBox.focusTextBox();
     */
    public async focusTextBox(): Promise<void> {
        let attempts = 1;

        do {
            try {
                await this.page.locator(this.elementLocator).waitFor();
                await this.page.locator(this.elementLocator).focus();
                await this.page.locator(this.elementLocator).click();

                console.info(this.elementName + ' TextBox is focused');
                return;
            } catch (e) {
                console.warn(
                    this.elementName + ' TextBox is not visible. Retrying... attempt: ' + attempts
                );
            }

            attempts++;
        } while (attempts <= 2);

        console.error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );

        throw new Error(
            this.elementName + ' TextBox is not visible after ' + attempts + ' attempts'
        );
    }
}