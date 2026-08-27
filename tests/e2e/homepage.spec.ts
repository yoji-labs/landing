import { expect, test } from "@playwright/test";

test("homepage renders key sections and hero demo switching works", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Software built around your business." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Custom systems for how businesses operate." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Collaborative from start to scale." }),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Kitchen Inventory product navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Kitchen Inventory product navigation" }).getByText("Inventory")).toBeVisible();
  await expect(page.getByTestId("hero-background-composition")).toBeVisible();
  await expect(page.getByTestId("product-preview-surface").getByTestId("product-preview-background")).toHaveCount(0);

  await page.getByRole("button", { name: "Client Scheduling" }).click();
  await expect(
    page.getByText(
      "Keep bookings, confirmations, availability, and client context inside one scheduling workflow.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Client Scheduling product navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Client Scheduling product navigation" }).getByText("Reservations")).toBeVisible();

  await page.getByRole("button", { name: "Operations Dashboard" }).click();
  await expect(
    page.getByText(
      "Surface the KPIs, operational bottlenecks, and team updates that help owners make decisions without digging.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Start a Project" }).first(),
  ).toHaveAttribute("href", "/contact");
  await expect(
    page.getByRole("link", { name: "Explore Our Work" }).first(),
  ).toHaveAttribute("href", "/#demos");
});

test("selected work previews are distinct and contact reads as one cohesive section", async ({
  page,
}) => {
  await page.goto("/");

  const inventoryPreview = page.getByLabel("Inventory work preview graphic");
  const schedulingPreview = page.getByLabel("Scheduling work preview graphic");
  const dashboardPreview = page.getByLabel("Dashboard work preview graphic");

  await expect(inventoryPreview).toBeVisible();
  await expect(inventoryPreview.getByText("Low Stock")).toBeVisible();
  await expect(inventoryPreview.getByText("Wagyu Beef")).toBeVisible();
  await expect(inventoryPreview.getByText("LOW", { exact: true }).first()).toBeVisible();

  await expect(schedulingPreview).toBeVisible();
  await expect(schedulingPreview.getByText("Mon")).toBeVisible();
  await expect(schedulingPreview.getByText("Thu")).toBeVisible();

  await expect(dashboardPreview).toBeVisible();
  await expect(dashboardPreview.getByText("Revenue")).toBeVisible();
  await expect(dashboardPreview.getByText("Service")).toBeVisible();

  await expect(page.getByTestId("contact-section")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Let's build software that works for you." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start a Project" }).last()).toHaveAttribute("href", "/contact");
  await expect(page.getByRole("link", { name: "Book a Call" }).last()).toHaveAttribute(
    "href",
    "/start-a-project/book",
  );
});

test("selected work previews stay contained and the hero accent originates from the right background", async ({
  page,
}) => {
  await page.setViewportSize({ width: 2200, height: 1200 });
  await page.goto("/");

  const inventoryPreview = page.getByLabel("Inventory work preview graphic");
  const inventoryTitle = page.getByRole("heading", { name: "Pantry inventory control" });

  const previewBox = await inventoryPreview.boundingBox();
  const titleBox = await inventoryTitle.boundingBox();
  const previewOverflow = await inventoryPreview.evaluate((element) => getComputedStyle(element).overflow);

  expect(previewBox).not.toBeNull();
  expect(titleBox).not.toBeNull();

  if (!previewBox || !titleBox) {
    return;
  }

  expect(previewOverflow).toBe("hidden");
  expect(titleBox.y).toBeGreaterThan(previewBox.y + previewBox.height + 8);

  const heroPreview = page.getByTestId("product-preview-surface");
  const heroBackground = page.getByTestId("hero-background-composition");
  const heroAmbientField = page.getByTestId("hero-ambient-field");
  const heroTerraEdge = page.getByTestId("hero-terra-edge");
  const heroBottomLeftCrop = page.getByTestId("hero-bottom-left-crop");

  await expect(heroAmbientField).toBeVisible();
  await expect(heroTerraEdge).toBeVisible();
  await expect(heroBottomLeftCrop).toBeVisible();

  const heroPreviewBox = await heroPreview.boundingBox();
  const heroBackgroundBox = await heroBackground.boundingBox();
  const heroAmbientFieldBox = await heroAmbientField.boundingBox();
  const heroTerraEdgeBox = await heroTerraEdge.boundingBox();
  const heroBottomLeftCropBox = await heroBottomLeftCrop.boundingBox();
  const viewport = page.viewportSize();

  expect(heroPreviewBox).not.toBeNull();
  expect(heroBackgroundBox).not.toBeNull();
  expect(heroAmbientFieldBox).not.toBeNull();
  expect(heroTerraEdgeBox).not.toBeNull();
  expect(heroBottomLeftCropBox).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (!heroPreviewBox || !heroBackgroundBox || !heroAmbientFieldBox || !heroTerraEdgeBox || !heroBottomLeftCropBox || !viewport) {
    return;
  }

  expect(heroAmbientFieldBox.x).toBeLessThan(heroPreviewBox.x - 320);
  expect(heroAmbientFieldBox.x + heroAmbientFieldBox.width).toBeGreaterThan(
    heroPreviewBox.x + heroPreviewBox.width * 0.75,
  );
  expect(heroTerraEdgeBox.width).toBeLessThan(heroPreviewBox.width * 0.17);
  expect(heroTerraEdgeBox.x).toBeGreaterThan(heroPreviewBox.x + heroPreviewBox.width * 0.9);
  expect(heroTerraEdgeBox.x + heroTerraEdgeBox.width).toBeGreaterThan(viewport.width - 40);
  expect(heroBottomLeftCropBox.x).toBeLessThan(0);
  expect(heroBottomLeftCropBox.y + heroBottomLeftCropBox.height).toBeGreaterThan(viewport.height - 60);
  expect(heroBackgroundBox.x).toBeLessThan(heroPreviewBox.x - 200);
});

test("general contact form reaches mocked success state", async ({ page }) => {
  await page.goto("/contact");

  await page.getByLabel("Name").fill("Dana");
  await page.getByLabel("Email").fill("dana@example.com");
  await page.getByLabel("Subject").fill("New workflow request");
  await page.getByLabel("Message").fill("We need help tightening our inventory and reporting flow.");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByText("Sent — check your inbox")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send another message" })).toBeVisible();
  await expect(page.getByText(/Local preview: your message was captured/)).toBeVisible();
});

test("how we work content sits near the section top without a large dead zone", async ({ page }) => {
  await page.goto("/");

  const aboutSection = page.locator("#about");
  const howWeWorkHeading = page.getByRole("heading", { name: "Collaborative from start to scale." });

  await aboutSection.scrollIntoViewIfNeeded();
  await expect(howWeWorkHeading).toBeVisible();

  const sectionBox = await aboutSection.boundingBox();
  const headingBox = await howWeWorkHeading.boundingBox();

  expect(sectionBox).not.toBeNull();
  expect(headingBox).not.toBeNull();

  if (!sectionBox || !headingBox) {
    return;
  }

  expect(headingBox.y - sectionBox.y).toBeLessThan(300);
});

test("desktop homepage section rail is visible and links to page sections", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/");

  const sectionRail = page.getByRole("navigation", { name: "Homepage sections" });

  await expect(sectionRail).toBeVisible();
  await expect(sectionRail.getByRole("link", { name: /01\s+Home/i })).toHaveAttribute("href", "#home");
  await expect(sectionRail.getByRole("link", { name: /02\s+Systems/i })).toHaveAttribute(
    "href",
    "#services",
  );
  await expect(sectionRail.getByRole("link", { name: /Contact/i })).toHaveCount(0);
});

test("contact page contains the unified form and primary site contact links point there", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Contact" }).first()).toHaveAttribute("href", "/contact");
  await expect(page.getByRole("link", { name: "Start a Project" }).first()).toHaveAttribute(
    "href",
    "/contact",
  );

  await page.goto("/contact");

  const contactSection = page.getByTestId("contact-section");

  await expect(page.getByRole("heading", { name: "Start the conversation." })).toBeVisible();
  await expect(contactSection.getByRole("link", { name: "hello@yojilabs.com" })).toBeVisible();
  await expect(contactSection.getByText("We typically reply within 1–2 business days.")).toBeVisible();
  await expect(contactSection.getByLabel("Name")).toBeVisible();
  await expect(contactSection.getByLabel("Email")).toBeVisible();
  await expect(contactSection.getByLabel("Subject")).toBeVisible();
  await expect(contactSection.getByLabel("Message")).toBeVisible();
  await expect(contactSection.getByRole("button", { name: "Send Message" })).toBeVisible();
});

test("shared site lockups use the canonical YojiLabs symbol asset", async ({ page }) => {
  const countCanonicalSymbols = () =>
    page.locator("img").evaluateAll((nodes) =>
      nodes.filter((node) =>
        (node.getAttribute("src") ?? "").includes("yojilabs-symbol-canonical"),
      ).length,
    );

  await page.goto("/");

  await expect.poll(countCanonicalSymbols).toBe(3);

  await page.goto("/contact");

  await expect.poll(countCanonicalSymbols).toBe(2);
});

test("homepage uses free scrolling and activates the section rail from a stable viewport line", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/");

  const htmlScrollSnapType = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollSnapType,
  );
  const sectionScrollSnapAlign = await page.evaluate(() => {
    const services = document.getElementById("services");
    return services ? getComputedStyle(services).scrollSnapAlign : null;
  });

  expect(htmlScrollSnapType).toBe("none");
  expect(sectionScrollSnapAlign).toBe("none");

  const sectionRail = page.getByRole("navigation", { name: "Homepage sections" });
  const currentRailLabel = () =>
    sectionRail
      .locator('[aria-current="location"]')
      .evaluate((node) => node.textContent?.replace(/\s+/g, "").trim() ?? "");

  await expect.poll(currentRailLabel).toContain("01Home");
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect.poll(currentRailLabel).toContain("02Systems");

  await page.locator("#demos").scrollIntoViewIfNeeded();
  await expect.poll(currentRailLabel).toContain("03Demos");

  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect.poll(currentRailLabel).toContain("04About");
});

test("hero editorial typography and caption hierarchy follow the refined presentation", async ({
  page,
}) => {
  await page.goto("/");

  const heroHeading = page.getByRole("heading", { name: "Software built around your business." });
  const heroPreview = page.getByTestId("product-preview-surface");
  const heroCaption = page.getByText(
    "Track stock, usage, and prep gaps in one place so your kitchen can move faster with fewer surprises.",
  );

  await expect(heroHeading).toBeVisible();
  await expect(heroPreview).toBeVisible();
  await expect(heroCaption).toBeVisible();

  const headingFontFamily = await heroHeading.evaluate(
    (node) => getComputedStyle(node).fontFamily,
  );
  expect(headingFontFamily.toLowerCase()).toContain("source");
  expect(headingFontFamily.toLowerCase()).toContain("serif");

  const previewBox = await heroPreview.boundingBox();
  const captionBox = await heroCaption.boundingBox();

  expect(previewBox).not.toBeNull();
  expect(captionBox).not.toBeNull();

  if (!previewBox || !captionBox) {
    return;
  }

  expect(captionBox.y).toBeGreaterThan(previewBox.y + previewBox.height - 2);
});

test("what we build cards remove sequencing and keep aligned bottom-right arrows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/");

  const servicesSection = page.locator("#services");
  const cards = servicesSection.getByTestId("service-card");
  const arrows = servicesSection.getByTestId("service-card-arrow");

  await expect(cards).toHaveCount(4);
  await expect(arrows).toHaveCount(4);
  await expect(servicesSection.getByText("01", { exact: true })).toHaveCount(0);
  await expect(servicesSection.getByText("02", { exact: true })).toHaveCount(0);
  await expect(servicesSection.getByText("03", { exact: true })).toHaveCount(0);
  await expect(servicesSection.getByText("04", { exact: true })).toHaveCount(0);

  const positions = await cards.evaluateAll((nodes) =>
    nodes.map((node) => {
      const card = node as HTMLElement;
      const arrow = card.querySelector('[data-testid="service-card-arrow"]') as HTMLElement | null;
      const cardRect = card.getBoundingClientRect();
      const arrowRect = arrow?.getBoundingClientRect();

      if (!arrowRect) {
        return null;
      }

      return {
        bottomInset: Math.round(cardRect.bottom - arrowRect.bottom),
        rightInset: Math.round(cardRect.right - arrowRect.right),
      };
    }),
  );

  expect(positions).toHaveLength(4);

  const validPositions = positions.filter((position) => position !== null);
  expect(validPositions).toHaveLength(4);

  const bottoms = validPositions.map((position) => position.bottomInset);
  const rights = validPositions.map((position) => position.rightInset);

  expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThanOrEqual(4);
  expect(Math.max(...rights) - Math.min(...rights)).toBeLessThanOrEqual(4);
});
