import {expect, test} from '@playwright/test'

test.describe('Google Search Bar', () => {
    test('Search for playwright on Google website', async ({page}) => {
        await page.goto(
            'https://www.google.com/webhp?hl=iw&sa=X&ved=0ahUKEwjejK3p4YGJAxW9RKQEHauVD-gQPAgI',
        )
        let searchBarLocator = page.locator('.gLFyf')
        await searchBarLocator.fill('Playwright Docs')
        let searchButton = page.getByLabel('חיפוש ב-Google').first()
        await searchButton.click()
        let searchResultPage = page.locator('#rcnt')
        await expect(searchResultPage).toContainText('https://playwright.dev')
    })
})
