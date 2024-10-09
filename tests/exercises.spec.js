import {test, expect} from '@playwright/test'

test.describe('Exercises', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://devexpress.github.io/testcafe/example/')
    })
    test('Exercise 1', async ({page}) => {
        for (const checkboxDataTestId of [
            'remote-testing-checkbox',
            'parallel-testing-checkbox',
            'analysis-checkbox',
        ]) {
            await page.getByTestId(checkboxDataTestId).check()
            await expect(page.getByTestId(checkboxDataTestId)).toBeChecked()
        }
    })
    test('Exercise 2', async ({page}) => {
        const MacOsElement = 'macos-radio'
        await page.getByTestId(MacOsElement).click()
        await expect(page.getByTestId(MacOsElement)).toBeChecked()
    })
    for (const options of ['Command Line', 'JavaScript API', 'Both']) {
        test(`Exercise 2 - ${options}`, async ({page}) => {
            const dropDownElement = 'preferred-interface-select'
            await page.getByTestId(dropDownElement).selectOption(options)
            await expect(page.getByTestId(dropDownElement)).toHaveValue(options)
        })
    }
    for (const textOption of ['Command Line', 'JavaScript API', 'Both']) {
        test(`Exercise 3 - ${textOption}`, async ({page}) => {
            const dropDownElement = 'preferred-interface-select'
            await page.getByTestId(dropDownElement).selectOption(textOption)
            await expect(page.getByTestId(dropDownElement)).toHaveValue(
                textOption,
            )
        })
    }
    test('Exercise 4', async ({page}) => {
        const triedTestCafeCheckbox = 'tried-testcafe-checkbox'
        const checkbox = page.getByTestId(triedTestCafeCheckbox)
        const isChecked = await checkbox.isChecked()
        if (!isChecked) {
            await expect(page.getByTestId('submit-button')).toBeDisabled()
        }
    })
    test('Exercise 5', async ({page}) => {
        const triedTestCafeCheckbox = 'tried-testcafe-checkbox'
        const checkbox = page.getByTestId(triedTestCafeCheckbox)
        await checkbox.check()
        const isChecked = await checkbox.isChecked()
        if (isChecked) {
            await expect(page.locator('#slider')).toBeEnabled()
        }
    })
    test('Exercise 6', async ({page}) => {
        const triedTestCafeCheckbox = 'tried-testcafe-checkbox'
        const commentsArea = 'comments-area'
        const myText =
            'This is my first Test.\nThis is my first Test.\nThis is my first Test.'
        await page.getByTestId(triedTestCafeCheckbox).check()
        await page.getByTestId(commentsArea).fill(myText)
        await expect(page.getByTestId(commentsArea)).toHaveValue(myText)
    })
    test('Exercise 7', async ({page}) => {
        await expect(page.getByTestId('submit-button')).toBeDisabled()
    })
    test('Exercise 8', async ({page}) => {
        async function fillForm() {
            await page.getByTestId('name-input').type('Netanel')
            await page.getByText('Support for testing on remote').click()
            await page.getByTestId('parallel-testing-checkbox').check()
            await page.getByTestId('analysis-checkbox').check()
            await page.getByTestId('macos-radio').check()
            await page
                .getByTestId('preferred-interface-select')
                .selectOption('JavaScript API')
            await page.getByTestId('tried-testcafe-checkbox').check()
        }
        await fillForm()
        await expect(page.getByTestId('submit-button')).toBeEnabled()
        await page.getByTestId('submit-button').click()
        await expect(page.getByTestId('thank-you-header')).toHaveText(
            'Thank you, Netanel!',
        )
    })
    test('Exercise 9', async ({page}) => {
        async function fillForm() {
            await page.getByTestId('name-input').type('Netanel')
            await page.getByTestId('remote-testing-checkbox').check()
            await page.getByTestId('parallel-testing-checkbox').check()
            await page.getByTestId('analysis-checkbox').check()
            await page.getByTestId('macos-radio').check()
            await page
                .getByTestId('preferred-interface-select')
                .selectOption('JavaScript API')
            await page.getByTestId('tried-testcafe-checkbox').check()
            await page
                .getByTestId('comments-area')
                .fill('This Is My Complete Test.')
        }
        await fillForm()
        await expect(page.getByTestId('submit-button')).toBeEnabled()
        await page.getByTestId('submit-button').click()
        await expect(page).toHaveURL(
            'https://devexpress.github.io/testcafe/example/thank-you.html',
        )
    })
})
