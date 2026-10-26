import { expect, test } from '../../src/fixtures/test-fixtures';

test.describe('Cheap Flights AU', () => {
  test('Verify if the Cheap Flights AU Logo and Sign In buttons are displayed', async ({
    mainPage
  }) => {
    await mainPage.navigateToCheapFlightsAU();
    expect(await mainPage.isCheapFlightsLogoVisible()).toBe(true);
    expect(await mainPage.isSignInButtonVisible()).toBe(true);

  });

  test('Verify if the Cheap Flights AU Logo and Sign In buttons are positioned correctly', async ({
    mainPage
  }) => {
    await mainPage.navigateToCheapFlightsAU();
    expect(await mainPage.isCheapFlightsLogoVisible()).toBe(true);
    expect(await mainPage.isSignInButtonVisible()).toBe(true);

    const cheapFlightsLogoLocation = await mainPage.getCheapFlightsLogoElementPosition();
    const signInButton = await mainPage.getSignInButtonPosition();

    expect(cheapFlightsLogoLocation).toEqual({
      x: 72,
      y: 30,
      width: 148,
      height: 20,
    });

    expect(signInButton).toEqual({
      x: 1205,
      y: 18,
      width: 44,
      height: 44,
    });

  });

  test('Verify if the Email Address TextBox returns an error message when an invalid Email Address is entered and Sign In button is clicked', async ({
    mainPage,
    signInModal
  }) => {
    await mainPage.navigateToCheapFlightsAU();
    expect(await mainPage.isSignInButtonVisible()).toBe(true);

    await mainPage.clickSignIn();

    await signInModal.isSignInModalVisible();
    await signInModal.clickContinueWithEmail();
    await signInModal.enterEmailAddress('adummyinvalidemail');
    await signInModal.clickSignIn();
    const expectedEmailAddressErrorMessage = 'That email format is not correct.';
    const actualEmailAddressErrorMessage = await signInModal.getEmailAddressErrorMessage();
    expect(actualEmailAddressErrorMessage).toContain(expectedEmailAddressErrorMessage);

  });

  test.only('Verify if Cheap Flights AU provides searched flight results', async ({
    mainPage,
    searchResultsPage,
    page,
  }) => {
    await mainPage.navigateToCheapFlightsAU();
    expect(await mainPage.isSignInButtonVisible()).toBe(true);
    await mainPage.removeFromToLocations();
    await mainPage.enterFrom('Bacolod, Negros Occidental, Philippines');
    await mainPage.enterAskAnything('Manila, Philippines');
    await mainPage.selectDates('24 November, 2026', '27 November, 2026');
    await mainPage.clickTravelers();
    expect(await mainPage.isTravellersModalVisible()).toBe(true);
    await mainPage.clickFlights();
    expect(await mainPage.isTravellersModalVisible()).toBe(false);
    await mainPage.uncheckCompareCheapflightsVSBookingCom();
    await mainPage.clickSearchFlights();

    expect(await searchResultsPage.isFlightResultsListWrapperVisible()).toBe(true);
    expect(await searchResultsPage.isTrackPricesLeftPanelVisible()).toBe(true);
    expect(await searchResultsPage.isCompareVSCheapFlightsRightPanelVisible()).toBe(true);
    expect(await searchResultsPage.areFlightResultsVisible()).toBe(true);

  });

});
