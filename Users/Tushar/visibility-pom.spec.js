import { test, expect } from '@playwright/test';
import { VisibilityPage } from '../pages/VisibilityPage';

test('Visibility Assertion using POM', async ({ page }) => {

    const visibility = new VisibilityPage(page);

    await visibility.open();

    await expect(visibility.textbox).toBeVisible();

    await visibility.hideTextbox();

    await expect(visibility.textbox).toBeHidden();

    await visibility.showTextbox();

    await expect(visibility.textbox).toBeVisible();

});