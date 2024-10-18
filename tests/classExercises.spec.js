import {test, expect} from '@playwright/test'

const checkbox_features = [
    'remote-testing-checkbox',
    'reusing-js-code-checkbox',
    'parallel-testing-checkbox',
    'ci-checkbox',
    'analysis-checkbox',
]
test.describe('HomeWork Exercises', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://devexpress.github.io/testcafe/example/')
    })

    test('Exercise 6', async ({page}) => {
        for (let checkbox of checkbox_features) {
            await page.getByTestId(checkbox).check()
        }
        await page.getByTestId('windows-radio').click()
        await page
            .getByTestId('preferred-interface-select')
            .selectOption('JavaScript API')
        await page.getByTestId('tried-testcafe-checkbox').check()
        await page
            .getByTestId('comments-area')
            .fill('My name is Haim. \nI live in Karmiel. \nMy age is 34')
        await page.getByTestId('name-input').pressSequentially('Haim A Melech')
        await page.getByTestId('submit-button').click()

        // After Submit
        await expect(page).toHaveURL(
            'https://devexpress.github.io/testcafe/example/thank-you.html',
        )
        await expect(page.getByTestId('thank-you-header')).toHaveText(
            'Thank you, Haim A Melech!',
        )
    })
})
