import { expect, test } from "@playwright/test";

test("renders the complete portfolio without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Building intelligence/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Technical depth/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Built across disciplines/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Proof, not promises/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Let's build what's next/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test("links to LinkedIn and the downloadable resume", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/cgeng");
  const resumeLink = page.getByRole("link", { name: /Résumé/ }).first();
  await expect(resumeLink).toHaveAttribute("href", "/Christine_Geng_resume.pdf");
  const response = await page.request.get("/Christine_Geng_resume.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("mobile navigation opens and reaches the work section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("heading", { name: /Proof, not promises/ })).toBeInViewport();
});

test("captures the final visual reference", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({ path: testInfo.outputPath("portfolio-full.png"), fullPage: true });
  await page.screenshot({ path: testInfo.outputPath("portfolio-fold.png") });
});
