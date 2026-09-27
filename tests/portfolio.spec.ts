import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 375, 430, 768, 1280, 1440]) {
  test(`RTL layout, images and touch targets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('طراحی و توسعه')
    await page.evaluate(() => document.fonts.ready)
    for (const section of ['home', 'projects', 'skills', 'about', 'contact']) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded()
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
        .toBe(true)
    }
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const images = page.locator('.project-card img')
    await expect(images).toHaveCount(3)
    for (const image of await images.all()) {
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
        .toBe(true)
      await expect(image).toHaveAttribute('loading', 'lazy')
      await expect(image).toHaveAttribute('src', /\.webp$/)
    }
    const smallButtons = await page
      .locator('button:visible, .button:visible, .header-cta:visible')
      .evaluateAll((buttons) =>
        buttons
          .filter((button) => button.getBoundingClientRect().height < 48)
          .map((button) => button.textContent),
      )
    expect(smallButtons).toEqual([])
    const bodyCopy = await page
      .locator(
        '.hero-description, .section-heading p, .project-content>p, .skill-card>p, .about-content>p, .contact-copy>p',
      )
      .evaluateAll((paragraphs) =>
        paragraphs
          .filter((p) => parseFloat(getComputedStyle(p).fontSize) < 16)
          .map((p) => p.textContent),
      )
    expect(bodyCopy).toEqual([])
  })
}

test('project filters and lazy-loaded accessible dialog work', async ({ page }) => {
  const dialogRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('ProjectDialog-')) dialogRequests.push(request.url())
  })
  await page.goto('/')
  expect(dialogRequests).toHaveLength(0)
  await page.getByRole('button', { name: 'داشبورد', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-card')).toContainText('نوا')
  await page.getByRole('button', { name: 'وب‌سایت', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-card')).toContainText('مینیمال')
  await page.getByRole('button', { name: 'اپلیکیشن', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-card')).toContainText('فلو')
  await page.getByRole('button', { name: /همه پروژه‌ها/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(3)
  const opener = page.getByRole('button', { name: 'مشاهده پروژه نوا؛ مدیریت، ساده‌تر از همیشه' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(dialogRequests.length).toBeGreaterThan(0)
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toContainText('نوا')
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  await opener.click()
  await page.getByRole('button', { name: 'بستن جزئیات پروژه' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await opener.click()
  await page.getByRole('link', { name: 'پروژهٔ مشابهی در ذهن دارید؟' }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('mobile menu navigates, closes on Escape and outside click', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'باز کردن منو' })
  await toggle.click()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation')).toBeHidden()
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.locator('.hero-description').click()
  await expect(page.getByRole('navigation')).toBeHidden()
  await toggle.click()
  await page.getByRole('navigation').getByRole('link', { name: 'مهارت‌ها' }).click()
  await expect(page).toHaveURL(/#skills$/)
  await expect(page.getByRole('navigation')).toBeHidden()
})

test('contact validates input and prepares an honest, encoded email draft', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  await page.getByRole('button', { name: 'آماده‌سازی پیام' }).click()
  await expect(page.locator('input:invalid')).not.toHaveCount(0)
  await page.getByLabel('نام شما', { exact: true }).fill('کاربر نمونه')
  await page.getByLabel('ایمیل شما', { exact: true }).fill('test@example.com')
  const message = 'سلام، برای طراحی و توسعه یک وب‌سایت جدید با شما تماس می‌گیرم. & سوال؟'
  await page.getByLabel('کمی از ایده‌تون بگید', { exact: true }).fill(message)
  await page.getByRole('button', { name: 'آماده‌سازی پیام' }).click()
  await expect(page.getByRole('status')).toContainText('پیش‌نویس آماده شد')
  const href = await page.getByRole('link', { name: 'باز کردن ایمیل' }).getAttribute('href')
  expect(href).toMatch(/^mailto:hello@example.com\?subject=/)
  expect(new URL(href!).searchParams.get('body')).toContain(message)
  await expect(page.getByRole('textbox', { name: 'متن آمادهٔ ایمیل' })).toContainText('کاربر نمونه')
  await page.getByRole('button', { name: 'کپی متن' }).click()
  await expect(page.getByRole('button', { name: 'متن کپی شد' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(message)
})

test('rejects whitespace-only message', async ({ page }) => {
  await page.goto('/#contact')
  await page.getByLabel('نام شما', { exact: true }).fill('کاربر نمونه')
  await page.getByLabel('ایمیل شما', { exact: true }).fill('test@example.com')
  await page.getByLabel('کمی از ایده‌تون بگید', { exact: true }).fill('            ')
  await page.getByRole('button', { name: 'آماده‌سازی پیام' }).click()
  await expect(page.getByRole('status')).toContainText('وارد کردن فاصله کافی نیست')
  await expect(page.getByRole('link', { name: 'باز کردن ایمیل' })).toHaveCount(0)
})

test('resume opens a local, printable page', async ({ page, context }) => {
  await page.goto('/')
  const popup = context.waitForEvent('page')
  await page.getByRole('link', { name: 'مشاهده و دریافت رزومه' }).click()
  const resume = await popup
  await resume.waitForLoadState()
  await expect(resume).toHaveURL(/\/resume.html$/)
  await expect(resume.getByRole('heading', { level: 1 })).toHaveText('حسین رضایی')
  await expect(resume.getByRole('button', { name: 'چاپ / ذخیره به‌صورت PDF' })).toBeVisible()
  await expect(resume.locator('.notice')).toContainText('این رزومه نمونه است')
})

test('the site is branded as حسین everywhere and never as آرمان', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('حسین رضایی | توسعه‌دهنده و طراح رابط کاربری')
  const header = page.locator('.site-header .brand-text')
  await expect(header).toContainText('حسین')
  await expect(page.locator('.hero-description')).toContainText('حسین رضایی')
  await expect(page.locator('.footer-bottom')).toContainText('© ۱۴۰۵ حسین رضایی')
  await expect(page.locator('.footer-brand .brand-text')).toContainText('حسین')
  await expect
    .poll(() =>
      page.evaluate(() => {
        const text = `${document.body.innerText} ${document.title}`
        return /آرمان|ارمان|arman/i.test(text)
      }),
    )
    .toBe(false)
})

test('reduced motion disables animation and leaves sections visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const hidden = await page
    .locator('[data-reveal]')
    .evaluateAll((elements) =>
      elements.some((element) => getComputedStyle(element).opacity !== '1'),
    )
  expect(hidden).toBe(false)
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
})

for (const width of [375, 1280]) {
  test(`WCAG A/AA accessibility checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([])
    await page.getByRole('button', { name: 'مشاهده پروژه نوا؛ مدیریت، ساده‌تر از همیشه' }).click()
    const dialogResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(
      dialogResults.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([])
  })
}

test('loads without errors or external runtime requests', async ({ page }) => {
  const errors: string[] = []
  const external: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4173') && !request.url().startsWith('data:'))
      external.push(request.url())
  })
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  expect(errors).toEqual([])
  expect(external).toEqual([])
})
