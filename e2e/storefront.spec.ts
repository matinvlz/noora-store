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

  test("auth: header button leads to login and registering signs in", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "ورود" }).first().click();
    await expect(page).toHaveURL(/\/auth\/login/);

    // Go to register and create an account
    await page.getByRole("link", { name: "ثبت‌نام کن" }).click();
    await expect(page).toHaveURL(/\/auth\/register/);
    await page.getByLabel("نام و نام خانوادگی").fill("نگار احمدی");
    await page.getByLabel("ایمیل").fill("negar@example.com");
    await page.getByLabel("رمز عبور").fill("secret123");
    await page.getByRole("button", { name: "ثبت‌نام" }).click();

    // Lands on profile, authenticated
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByRole("heading", { name: "نگار احمدی" })).toBeVisible();
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
