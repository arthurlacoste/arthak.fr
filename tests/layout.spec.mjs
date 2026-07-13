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

test.describe('mobile bio alignment', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('aligns logo and name at top, with location below name', async ({ page }) => {
    await page.goto('/')

    const logo = await page.locator('.avatar-link').boundingBox()
    const name = await page.locator('.ascii-name').boundingBox()
    const location = await page.locator('.location').boundingBox()
    const intro = await page.locator('.intro').boundingBox()

    expect(Math.abs(logo.y - name.y)).toBeLessThan(2)
    expect(location.x).toBeGreaterThan(name.x - 2)
    expect(location.y).toBeGreaterThan(name.y + name.height - 2)
    expect(location.y - (name.y + name.height)).toBeLessThan(8)
    expect(intro.y).toBeGreaterThan(logo.y + logo.height + 18)
    await page.locator('.bio').screenshot({ path: '/tmp/arthak/test-captures/mobile-bio-alignment.png' })
  })
})

test.describe('social links and navigation targets', () => {
  test('social links align left with translations at desktop bottom', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const footer = page.locator('.social-footer')
    const box = await footer.boundingBox()

    await expect(footer).toHaveCSS('position', 'fixed')
    const translations = await page.locator('.top-language-switch').boundingBox()
    expect(box.y + box.height).toBeGreaterThan(850)
    const twitterLink = footer.locator('a').first()
    const twitter = await twitterLink.boundingBox()
    const textBox = await twitterLink.evaluate(node => {
      const range = document.createRange()
      range.selectNodeContents(node)
      const { x, width } = range.getBoundingClientRect()
      return { x, width }
    })
    expect(Math.abs(textBox.x - translations.x)).toBeLessThan(2)
    expect(textBox.x - twitter.x).toBeGreaterThanOrEqual(13)
    expect(twitter.width - textBox.width - (textBox.x - twitter.x)).toBeGreaterThanOrEqual(27)
    await footer.screenshot({ path: '/tmp/arthak/test-captures/social-links-desktop.png' })
  })

  test('social links are centered in mobile footer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const footer = page.locator('.social-footer')
    const links = footer.locator('.social-links')

    await expect(footer).toHaveCSS('position', 'static')
    await expect(links).toHaveCSS('justify-content', 'center')
    await footer.scrollIntoViewIfNeeded()
    await footer.screenshot({ path: '/tmp/arthak/test-captures/social-links-mobile.png' })
  })

  test('social links switch to footer below 1220px', async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 })
    await page.goto('/')

    await expect(page.locator('.social-footer')).toHaveCSS('position', 'static')
    await expect(page.locator('.social-links')).toHaveCSS('flex-direction', 'row')
  })

  test('topbar links keep text position with larger hit areas', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const link = page.locator('.top-nav a').first()
    const box = await link.boundingBox()
    const fontSize = Number.parseFloat(await link.evaluate(node => getComputedStyle(node).fontSize))

    expect(box.height).toBeGreaterThan(fontSize + 12)
  })
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

  test('uses emoji, linked title, then unstyled date', async ({ page }) => {
    const item = page.locator('.posts-list li').first()

    await expect(item).toContainText('🎮')
    await expect(item.locator('strong a')).toHaveAttribute('href', '/fr/posts/pong/')
    await expect(item.locator('.post-date')).toHaveCount(0)
    await page.locator('.posts-list').screenshot({ path: '/tmp/arthak/test-captures/posts-fr-emojis.png' })
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
