import {test, expect} from '@playwright/test'

test.describe('Playwright Exercises - TestCafe', () => {
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

  test('Exercise 3', async ({page}) => {
    const dropDownElement = 'preferred-interface-select'
    await page.getByTestId(dropDownElement).selectOption('JavaScript API')
    await expect(page.getByTestId(dropDownElement)).toHaveValue(
      'JavaScript API',
    )
  })

  test('Exercise 4', async ({page}) => {
    const triedTestCafeCheckbox = 'tried-testcafe-checkbox'
    const commentsArea = 'comments-area'
    const myText =
      'This is my first line.\nThis is my second line.\nThis is my third line.'

    await page.getByTestId(triedTestCafeCheckbox).check()
    await page.getByTestId(commentsArea).fill(myText)
    await expect(page.getByTestId(commentsArea)).toHaveValue(myText)
  })

  test('Exercise 5', async ({page}) => {
    await page.getByTestId('name-input').type('Netanel')
    await page.getByText('Support for testing on remote').click()
    await page.getByTestId('parallel-testing-checkbox').check()
    await page.getByTestId('analysis-checkbox').check()
    await page.getByTestId('macos-radio').check()
    await page
      .getByTestId('preferred-interface-select')
      .selectOption('JavaScript API')
    await page.getByTestId('tried-testcafe-checkbox').check()
    await page.evaluate(() => {
      document.querySelector('[data-testid="submit-button"]').disabled = false
    })
    await page.getByTestId('submit-button').click()
    await expect(page).toHaveURL(
      'https://devexpress.github.io/testcafe/example/thank-you.html',
    )
    await expect(page.getByTestId('thank-you-header')).toHaveText(
      'Thank you, Netanel!',
    )
  })
})
