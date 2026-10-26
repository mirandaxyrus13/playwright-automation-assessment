import { Page } from '@playwright/test';
import { Element } from 'src/core/web-elements/element';
import { Button } from 'src/core/web-elements/button';
import { TextBox } from 'src/core/web-elements/textbox';

export class SignInModal {

    private page: Page;
    private readonly signInModal: Element;
    private readonly continueWithEmailButton: Button;
    private readonly emailAddressTextBox: TextBox;
    private readonly signInButton: Button;
    private readonly emailAddressErrorMessage: Element;

    constructor(page: Page) {
        this.page = page;
        this.signInModal = new Element(
            page,
            'Sign In Modal',
            'div[role="dialog"] div.c-ulo-content'
        );
        this.continueWithEmailButton = new Button(
            page,
            'Continue with email',
            '//*[starts-with(text(), "Continue with email")]//ancestor::button'
        );
        this.emailAddressTextBox = new TextBox(
            page,
            'Email Address',
            'input#auth-email-input'
        );
        this.signInButton = new Button(
            page,
            'Sign In',
            '//*[starts-with(text(), "Sign in")]//ancestor::button'
        );
        this.emailAddressErrorMessage = new Element(
            page,
            'Email Address Error Message',
            'div[role="alert"] span[class*="text"]'
        );
    }

    /**
     * Checks whether the Sign In modal is visible.
     *
     * @returns A Promise that resolves to true if the modal is visible;
     * otherwise, false.
     */
    public async isSignInModalVisible(): Promise<boolean> {
        return await this.signInModal.isElementVisible();
    }

    /**
     * Clicks the Continue with email button to open the email sign-in form.
     *
     * @returns A Promise that resolves when the button interaction completes.
     */
    public async clickContinueWithEmail(): Promise<void> {
        await this.continueWithEmailButton.clickButton();
    }

    /**
     * Enters an email address into the email address text box.
     *
     * @param emailAddress - Email address to enter into the sign-in form.
     * @returns A Promise that resolves when the text entry completes.
     */
    public async enterEmailAddress(emailAddress: string): Promise<void> {
        await this.emailAddressTextBox.enterText(emailAddress);
    }

    /**
     * Clicks the Sign In button to submit the email sign-in form.
     *
     * @returns A Promise that resolves when the button interaction completes.
     */
    public async clickSignIn(): Promise<void> {
        await this.signInButton.clickButton();
    }

    /**
     * Retrieves the email address error message displayed in the modal.
     *
     * @returns A Promise that resolves to the error message text,
     * or null if the underlying Element implementation returns null.
     */
    public async getEmailAddressErrorMessage(): Promise<string | null> {
        const errorMessage = await this.emailAddressErrorMessage.getElementText();
        return errorMessage;
    }
}