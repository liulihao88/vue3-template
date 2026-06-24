import { expect, test } from '@playwright/test'

test.describe('Login flow', () => {
  test('logs in and lands on the components collection page', async ({ page }) => {
    await page.goto('/#/login')

    await page.getByPlaceholder('账号').fill('admin')
    await page.getByPlaceholder('密码').fill('admin123')
    await page.getByRole('button', { name: '登录' }).click()

    await page.waitForURL('**/#/compsCollection')
    await expect(page).toHaveURL(/#\/compsCollection$/)
    await expect(page.getByText('组件集合').first()).toBeVisible()
  })
})
