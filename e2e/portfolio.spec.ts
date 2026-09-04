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

test("opens the digital twin and completes a career conversation", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    const payload = route.request().postDataJSON() as { messages: Array<{ content: string }> };
    expect(payload.messages.at(-1)?.content).toBe("What kind of AI work has Christine done?");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ reply: "I’ve built applied AI systems across healthcare, research, and enterprise environments." }),
    });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Chat with Christine's digital twin" }).click();
  await expect(page.getByRole("dialog", { name: "Career chat" })).toBeVisible();
  await page.getByRole("button", { name: "What kind of AI work has Christine done?" }).click();
  await expect(page.getByText("I’ve built applied AI systems across healthcare, research, and enterprise environments.")).toBeVisible();
  await page.getByRole("button", { name: "Close career chat" }).click();
  await expect(page.getByRole("dialog", { name: "Career chat" })).not.toBeVisible();
});

test("rejects an empty chat request", async ({ page }) => {
  const response = await page.request.post("/api/chat", { data: { messages: [] } });
  expect(response.status()).toBe(400);
});
