import { test, expect } from '@playwright/test'

const RIVERS_URL = '/rivers/vakarm/'
const POSTS_URL = '/fr/posts/'

test.describe('localized floating bio logo', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  for (const [path, home] of [['/', '/'], ['/fr/', '/fr/']]) {
    test(`${path} links logo to ${home}`, async ({ page }) => {
      await page.goto(path)
      const logo = page.locator('.avatar-link')

      await expect(logo).toHaveAttribute('href', home)
      await logo.hover()
      await expect(logo).toHaveCSS('animation-name', 'avatar-float')
      await logo.screenshot({
        path: `/tmp/arthak/test-captures/bio-logo-${home === '/' ? 'en' : 'fr'}-hover.png`,
        animations: 'disabled',
      })
    })
  }
})

test.describe('English home latest posts', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('shows exactly five latest posts', async ({ page }) => {
    await page.goto('/')

    const posts = page.locator('h2', { hasText: 'Posts' }).locator('xpath=following-sibling::ul[contains(@class, "home-posts")][1]')
    await expect(posts.locator('li')).toHaveCount(5)
    await posts.screenshot({ path: '/tmp/arthak/test-captures/home-en-latest-posts.png' })
  })
})

test.describe('posts page – desktop (1440px)', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test.beforeEach(async ({ page }) => {
    await page.goto(POSTS_URL)
  })

  test('date is to the left of the title', async ({ page }) => {
    const item = page.locator('.post-item').first()
    const dateBox = await item.locator('.post-date').boundingBox()
    const titleBox = await item.locator('a').boundingBox()
    expect(titleBox.x).toBeGreaterThan(dateBox.x + dateBox.width - 10)
  })

  test('date is vertically aligned with title', async ({ page }) => {
    const item = page.locator('.post-item').first()
    const titleBox = await item.locator('a').boundingBox()
    const dateBox = await item.locator('.post-date').boundingBox()
    expect(Math.abs(dateBox.y - titleBox.y)).toBeLessThan(10)
  })
})

test.describe('rivers page – desktop (1440px)', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test.beforeEach(async ({ page }) => {
    await page.goto(RIVERS_URL)
  })

  test('content has max-width 680px', async ({ page }) => {
    const box = await page.locator('.rivers-content').boundingBox()
    expect(box.width).toBeLessThanOrEqual(680)
    expect(box.width).toBeGreaterThan(500)
  })

  test('content is centered in shell', async ({ page }) => {
    const shellBox = await page.locator('.rivers-shell').boundingBox()
    const contentBox = await page.locator('.rivers-content').boundingBox()
    const shellCenter = shellBox.x + shellBox.width / 2
    const contentCenter = contentBox.x + contentBox.width / 2
    expect(Math.abs(shellCenter - contentCenter)).toBeLessThan(200)
  })

  test('toc is visible from the top of the page', async ({ page }) => {
    const tocBox = await page.locator('.rivers-toc').boundingBox()
    expect(tocBox.y).toBeLessThan(150)
  })

  test('toc is to the right of content', async ({ page }) => {
    const contentBox = await page.locator('.rivers-content').boundingBox()
    const tocBox = await page.locator('.rivers-toc').boundingBox()
    expect(tocBox.x).toBeGreaterThan(contentBox.x + contentBox.width - 10)
  })

  test('toc is 200px wide', async ({ page }) => {
    const tocBox = await page.locator('.rivers-toc').boundingBox()
    expect(tocBox.width).toBeCloseTo(200, 0)
  })

  test('toc hamburger is hidden on desktop', async ({ page }) => {
    const btn = page.locator('.rivers-toc-btn')
    await expect(btn).toBeHidden()
  })

  test('no bio sidebar', async ({ page }) => {
    await expect(page.locator('.bio')).toHaveCount(0)
  })

  test('toc links target heading anchors', async ({ page }) => {
    const link = page.locator('.rivers-toc a').first()
    const target = await link.getAttribute('href')

    expect(target).toMatch(/^#.+/)
    await expect(page.locator(target)).toHaveCount(1)
    await link.click()
    expect(new URL(page.url()).hash).toBe(target)
  })
})

test.describe('rivers page – mobile (375px)', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    await page.goto(RIVERS_URL)
  })

  test('toc is hidden by default', async ({ page }) => {
    const toc = page.locator('.rivers-toc')
    await expect(toc).toBeHidden()
  })

  test('hamburger button is visible', async ({ page }) => {
    const btn = page.locator('.rivers-toc-btn')
    await expect(btn).toBeVisible()
  })

  test('hamburger toggles toc', async ({ page }) => {
    const btn = page.locator('.rivers-toc-btn')
    const toc = page.locator('.rivers-toc')

    await btn.click()
    await expect(toc).toBeVisible()

    const tocBox = await toc.boundingBox()
    expect(tocBox.width).toBeGreaterThanOrEqual(250)
    expect(tocBox.x).toBeGreaterThan(0)
  })

  test('content fills mobile width', async ({ page }) => {
    const box = await page.locator('.rivers-content').boundingBox()
    expect(box.width).toBeGreaterThan(300)
  })
})
