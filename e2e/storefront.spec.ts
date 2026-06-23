import { test, expect } from "@playwright/test";

test.describe("Noora storefront", () => {
  test("home page renders hero, brands and deals", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/نورا/);
    // Hero CTA
    await expect(page.getByRole("link", { name: "خرید فوری" })).toBeVisible();
    // Brand filter + deals sections exist
    await expect(page.locator("#brands")).toBeVisible();
    await expect(page.locator("#deals")).toBeVisible();
  });

  test("brand filter narrows the product grid", async ({ page }) => {
    await page.goto("/");
    const brandSection = page.locator("#brands");
    const allCount = await brandSection.getByRole("button").count();
    expect(allCount).toBeGreaterThan(1);
    // Click the first specific brand chip (index 0 is "همه")
    await brandSection.getByRole("button").nth(1).click();
    await expect(brandSection.getByRole("heading", { level: 3 }).first()).toBeVisible();
  });

  test("adding a product opens the cart with a count badge", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "افزودن به سبد" })
      .first()
      .click();
    // Cart sheet opens
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("جمع کل")).toBeVisible();
    // Checkout CTA present
    await expect(dialog.getByRole("button", { name: "تکمیل خرید" })).toBeVisible();
  });

  test("wishlist toggle stores an item", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "افزودن به علاقه‌مندی‌ها" })
      .first()
      .click();
    // Open wishlist from header
    await page
      .getByRole("button", { name: "علاقه‌مندی‌ها", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("sub-pages load", async ({ page }) => {
    for (const path of ["/products", "/brands", "/deals", "/blog"]) {
      const res = await page.goto(path);
      expect(res?.status()).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("product detail page shows price, specs and actions", async ({
    page,
  }) => {
    await page.goto("/products");
    // Click a product title to open its detail page
    await page.locator("#products h3").first().click();
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "مشخصات فنی" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "افزودن به سبد" })
    ).toBeVisible();
  });

  // Reads the demo OTP hint and submits it. Assumes the mobile step is filled.
  async function completeOtp(page: import("@playwright/test").Page) {
    await page.getByRole("button", { name: "ارسال کد تأیید" }).click();
    const hint = await page.getByText(/کد دموی شما/).textContent();
    const code = (hint?.match(/\d{4}/) ?? ["0000"])[0];
    await page.getByPlaceholder("• • • •").fill(code);
    await page.getByRole("button", { name: "تأیید و ورود" }).click();
  }

  test("auth: OTP login from the header lands on the profile", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "ورود" }).first().click();
    await expect(page).toHaveURL(/\/auth\/login/);
    await page.getByPlaceholder("09123456789").fill("09123456789");
    await completeOtp(page);
    await expect(page).toHaveURL(/\/profile/);
  });

  test("auth: OTP register stores the chosen name", async ({ page }) => {
    await page.goto("/auth/register");
    await page.getByPlaceholder("مثلاً نگار احمدی").fill("نگار احمدی");
    await page.getByPlaceholder("09123456789").fill("09123456789");
    await completeOtp(page);
    await expect(page).toHaveURL(/\/profile/);
    await expect(
      page.getByRole("heading", { name: "نگار احمدی" })
    ).toBeVisible();
  });

  test("guest checkout: cart redirects to login then completes payment", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "افزودن به سبد" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "تکمیل خرید" }).click();

    // Guest intercepted → login with return URL
    await expect(page).toHaveURL(/\/auth\/login\?redirect=/);
    await page.getByPlaceholder("09123456789").fill("09123456789");
    await completeOtp(page);

    // Returned to checkout
    await expect(page).toHaveURL(/\/checkout/);
    await page.getByLabel("شهر").fill("تهران");
    await page.getByLabel("کد پستی").fill("1234567890");
    await page.getByLabel("نشانی کامل").fill("خیابان ولیعصر، پلاک ۱");
    await page.getByRole("button", { name: /پرداخت/ }).click();

    await expect(
      page.getByRole("heading", { name: "سفارش با موفقیت ثبت شد!" })
    ).toBeVisible();
    await expect(page.getByText(/کد پیگیری/)).toBeVisible();
  });

  test("custom 404 page renders for unknown routes", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("۴۰۴")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "بازگشت به خانه" })
    ).toBeVisible();
  });
});
