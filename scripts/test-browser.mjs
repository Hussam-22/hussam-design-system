import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
const root = resolve(import.meta.dirname, "..");
const base = process.env.HDS_PREVIEW_URL || "http://127.0.0.1:5173";
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
await mkdir(join(root, "docs/screenshots"), { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-angle=swiftshader",
    "--enable-webgl",
    "--enable-unsafe-swiftshader",
  ],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
const report = {
  date: "2026-10-07",
  desktop: { width: 1440, height: 1100 },
  screenshots: [],
  checks: [],
  runtimeErrors: errors,
};
async function open(name) {
  await page.goto(`${base}/?component=hds-${name}`);
  await page.locator("[data-preview]").waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}
async function check(name, fn) {
  await fn();
  report.checks.push({ name, status: "passed" });
  console.log(`PASS ${name}`);
}
try {
  for (const entry of process.argv.includes("--checks-only") ? [] : catalog) {
    await open(entry.name.replace("hds-", ""));
    const preview = page.locator(`[data-preview="${entry.name}"]`);
    await preview.scrollIntoViewIfNeeded();
    if (entry.name === "hds-robot-orb") {
      await page
        .locator('.hds-orb[data-ready="true"]')
        .waitFor({ timeout: 15000 });
      report.robotWebGL = true;
    }
    if (entry.name === "hds-browser-transform") await page.waitForTimeout(6300);
    if (entry.name === "hds-spotlight-hover")
      await preview
        .locator(".hds-spotlight")
        .hover({ position: { x: 170, y: 150 } });
    await page.waitForTimeout(450);
    if (entry.name === "hds-robot-orb")
      await page.locator('.hds-orb[data-blink="open"]').waitFor();
    await preview.screenshot({ path: join(root, entry.screenshot) });
    report.screenshots.push(entry.name);
    console.log(`PREVIEW ${entry.name}`);
  }
  await check("Spotlight follows pointer", async () => {
    await open("spotlight-hover");
    const card = page.locator(".hds-spotlight");
    await card.hover({ position: { x: 120, y: 110 } });
    assert(
      Math.abs(
        parseFloat(
          await card.evaluate((el) => el.style.getPropertyValue("--hds-x")),
        ) - 120,
      ) <= 2,
    );
  });
  await check("Comparison synchronizes desktop and phone", async () => {
    await open("device-comparison");
    await page.getByRole("button", { name: "Before", exact: true }).click();
    assert(
      await page.getByAltText("Sample original design, desktop").isVisible(),
    );
    assert(
      await page.getByAltText("Sample original design, mobile").isVisible(),
    );
    await page.getByRole("button", { name: "After", exact: true }).click();
    assert(
      await page.getByAltText("Sample redesigned website, desktop").isVisible(),
    );
  });
  await check("Carousel next and previous", async () => {
    await open("carousel");
    await page.getByRole("button", { name: "Next item" }).click();
    await page.waitForFunction(
      () =>
        document.querySelector('[aria-live="polite"]')?.textContent === "2 / 3",
    );
    assert.equal(
      await page.locator('[aria-live="polite"]').textContent(),
      "2 / 3",
    );
    await page.getByRole("button", { name: "Previous item" }).click();
    await page.waitForFunction(
      () =>
        document.querySelector('[aria-live="polite"]')?.textContent === "1 / 3",
    );
    assert.equal(
      await page.locator('[aria-live="polite"]').textContent(),
      "1 / 3",
    );
  });
  await check("Chat answers and discloses a source", async () => {
    await open("chat-demo");
    await page
      .locator('[data-ui="question-suggestions"] button')
      .first()
      .click();
    await page.waitForTimeout(700);
    assert.equal(await page.locator('[data-ui~="chat-message"]').count(), 3);
    await page.locator('[data-ui="source-toggle"]').click();
    assert(await page.locator('[data-ui="source-detail"]').isVisible());
    await page
      .getByRole("button", { name: "New conversation", exact: true })
      .click();
    assert.equal(await page.locator('[data-ui~="chat-message"]').count(), 1);
  });
  await check("Dashboard adds searches and deletes a record", async () => {
    await open("dashboard-demo");
    await page
      .getByRole("button", { name: "Add project", exact: true })
      .click();
    await page
      .getByLabel("Project name", { exact: true })
      .fill("HDS browser test");
    await page.getByLabel("Client", { exact: true }).fill("Synthetic client");
    await page.locator("#project-value").fill("100");
    await page.getByRole("button", { name: "Add to workspace" }).click();
    await page
      .locator('[data-ui="search-field"] input')
      .fill("HDS browser test");
    assert.equal(await page.locator("tbody tr").count(), 1);
    await page.getByRole("button", { name: "Delete HDS browser test" }).click();
    assert(await page.locator('[data-ui="table-empty"]').isVisible());
  });
  await check("Dialog supports Escape and focus return", async () => {
    await open("ui-primitives");
    const trigger = page.getByRole("button", { name: "Open dialog" });
    await trigger.click();
    assert(await page.getByRole("dialog").isVisible());
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert(await trigger.evaluate((el) => el === document.activeElement));
  });
  await check("Responsive showcase toggles scoped details", async () => {
    await open("responsive-showcase");
    await page.locator('[data-ui="studio-contact"]').click();
    assert(await page.locator('[data-ui="studio-details"]').isVisible());
    assert.equal(
      await page
        .locator('[data-ui="phone-explore"]')
        .getAttribute("aria-expanded"),
      "true",
    );
  });
  await check("Dark palette", async () => {
    await open("gradient-palette");
    await page.getByRole("button", { name: "Dark theme" }).click();
    assert.equal(
      await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue("--page")
          .trim(),
      ),
      "#000000",
    );
    await page
      .locator("[data-preview]")
      .screenshot({ path: join(root, "docs/screenshots/palette-dark.png") });
  });
  await check("Reduced motion robot fallback and spotlight", async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open("robot-orb");
    assert.equal(
      await page.locator(".hds-orb").getAttribute("data-ready"),
      null,
    );
    await open("spotlight-hover");
    await page.locator(".hds-spotlight").hover();
    assert.equal(
      await page
        .locator(".hds-spotlight")
        .evaluate((el) => getComputedStyle(el, "::before").display),
      "none",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
  });
  await check("Explicit motion setting reacts after mount", async () => {
    await open("robot-orb");
    await page.locator('.hds-orb[data-ready="true"]').waitFor();
    await page.evaluate(
      () => (document.documentElement.dataset.motion = "reduce"),
    );
    await page.waitForTimeout(150);
    assert.equal(
      await page.locator(".hds-orb").getAttribute("data-ready"),
      null,
    );
    await page.evaluate(() => delete document.documentElement.dataset.motion);
  });
  await check("All previews fit mobile viewport", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const entry of catalog) {
      await open(entry.name.replace("hds-", ""));
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      assert.equal(overflow, false, entry.name);
    }
    await open("service-card");
    await page.locator("[data-preview]").screenshot({
      path: join(root, "docs/screenshots/service-card-mobile.png"),
    });
  });
  await check("RTL carousel advances in reading direction", async () => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await open("carousel");
    await page
      .locator(".hds-carousel")
      .evaluate((el) => el.setAttribute("dir", "rtl"));
    await page.getByRole("button", { name: "Next item" }).click();
    await page.waitForTimeout(600);
    assert.equal(
      await page.locator('[aria-live="polite"]').textContent(),
      "2 / 3",
    );
  });
  assert.deepEqual(errors, [], "Browser runtime errors");
  // Capture actual upstream-installed TechText from the owner’s running site, if available.
  const site = context.newPage();
  const reference = await site;
  try {
    await reference.goto("http://127.0.0.1:4321/", { timeout: 20000 });
    const text = reference.locator('[data-ui~="hero-tech-word"]');
    await text.waitFor();
    await reference
      .locator('[data-ui~="tech-text-canvas"]')
      .waitFor({ timeout: 10000 });
    await reference.waitForTimeout(1500);
    await text.screenshot({
      path: join(root, "docs/screenshots/hds-tech-text.png"),
    });
    report.techTextPreview = "Captured from installed portfolio component";
  } catch (error) {
    report.techTextPreview = `Gallery recipe fallback: ${error.message.split("\n")[0]}`;
  } finally {
    await reference.close();
  }
  report.status = "passed";
  await writeFile(
    join(root, "docs/validation.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    `Validated ${catalog.length} previews and ${report.checks.length} interaction checks.`,
  );
} catch (error) {
  report.status = "failed";
  report.failure = error.message;
  await writeFile(
    join(root, "docs/validation.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  throw error;
} finally {
  await browser.close();
}
