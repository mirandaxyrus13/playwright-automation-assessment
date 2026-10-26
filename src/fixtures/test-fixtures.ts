import { test as base } from '@playwright/test';
import { BookingsApi } from '../api/bookings-api';
import { Faker } from '../core/library/faker';
import { MainPage } from 'src/pages/cheap-flights-au/main-page';
import { SearchResultsPage } from 'src/pages/cheap-flights-au/search-results-page';
import { SignInModal } from 'src/pages/cheap-flights-au/sign-in-modal';

type Libraries = {
  faker: Faker;
};

type UiFixtures = {
  mainPage: MainPage;
  signInModal: SignInModal
  searchResultsPage: SearchResultsPage;
  waitForNewTab: (triggerAction: () => Promise<void>) => Promise<SearchResultsPage>;
};

type ApiFixtures = {
  bookingsApi: BookingsApi;
};

export const test = base.extend<UiFixtures & ApiFixtures & Libraries>({

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  signInModal: async ({ page }, use) => {
    await use(new SignInModal(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  bookingsApi: async ({ request }, use) => {
    await use(new BookingsApi(request));
  },
  faker: async ({}, use) => {
    await use(new Faker());
  }, // ✅ Added missing comma here

  waitForNewTab: async ({ context }, use) => { // ✅ Swapped 'page' for 'context' to catch new tabs globally
    const handleNewTab = async (triggerAction: () => Promise<void>): Promise<SearchResultsPage> => {
        // 1. Listen for new pages opening anywhere in the browser context
        const pagePromise = context.waitForEvent('page');
        
        // 2. Run the user's click/action
        await triggerAction();
        
        // 3. Resolve and stabilize the new page context
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        
        // 4. Return a clean, fixture-generated instance bound to the new tab
        return new SearchResultsPage(newTab);
    };

    await use(handleNewTab);
  }
});

export { expect } from '@playwright/test';