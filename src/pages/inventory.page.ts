import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/web-core';

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = this.byTestId('inventory-list');
    this.inventoryItems = this.byTestId('inventory-item');
    this.title = this.byTestId('title');
  }

  async isLoaded(): Promise<boolean> {
    await this.inventoryList.waitFor({ state: 'visible' });
    return this.page.url().includes('/inventory.html');
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }
}
