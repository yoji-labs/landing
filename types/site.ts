export type AbsoluteUrl = `http://${string}` | `https://${string}`;

export type AssetPath = `/${string}`;

export type DeploymentStage = "local" | "preview" | "production";

export type MarketingRouteBase = "/" | `/${string}`;

export type MaybeAbsoluteUrl = AbsoluteUrl | null;

export type InternalRoute =
  | "/"
  | "/contact"
  | "/demos"
  | "/privacy"
  | "/terms"
  | "/start-a-project"
  | "/start-a-project/book"
  | "/start-a-project/intake"
  | `/start-a-project/intake?interest=${string}`
  | `/demos/${DemoId}`;

export type AnchorRoute = "/#services" | "/#demos" | "/#about" | "/#contact";

export type InternalHref = InternalRoute | AnchorRoute;

export type SiteHref = InternalHref | AbsoluteUrl;

export type DemoId =
  | "kitchen-inventory"
  | "bookings-website"
  | "operations-dashboard";

/**
 * Demo tiers, matched to what actually exists:
 * - "interactive-preview": a real product, shown as a guided walkthrough with sample data.
 * - "concept": scoped but not built; the card invites a conversation, never an app link.
 * - "live": reserved for a future self-serve product that anonymous visitors can open.
 */
export type DemoTier = "interactive-preview" | "concept" | "live";

export type MockSubmissionState = "success" | "error";

export interface ExternalAppUrls {
  readonly pantryApp: AbsoluteUrl;
  readonly kitchenInventoryDemo: AbsoluteUrl;
  readonly bookingsWebsiteDemo: MaybeAbsoluteUrl;
  readonly operationsDashboardDemo: MaybeAbsoluteUrl;
}

export interface IntegrationConfig {
  /** Cal.com link, e.g. "yojilabs/intro". Null → booking falls back to the request-times card. */
  readonly calLink: string | null;
  /** Cloudflare Turnstile site key. Null → widget hidden, server skips token verification. */
  readonly turnstileSiteKey: string | null;
  /** Embed URL of the recorded Pantry walkthrough (Arcade / Supademo). Null → in-page preview. */
  readonly pantryTourUrl: MaybeAbsoluteUrl;
}

export interface ContactEndpointUrls {
  readonly generalContact: MaybeAbsoluteUrl;
  readonly projectIntake: MaybeAbsoluteUrl;
  readonly bookingRequest: MaybeAbsoluteUrl;
}

export interface SiteUrlConfig {
  readonly siteUrl: AbsoluteUrl;
  readonly canonicalUrl: AbsoluteUrl;
  readonly ogImageUrl: AbsoluteUrl;
  readonly marketingRouteBase: MarketingRouteBase;
  readonly externalApps: ExternalAppUrls;
  readonly contactEndpoints: ContactEndpointUrls;
  readonly integrations: IntegrationConfig;
}

export interface BrandAssetPaths {
  readonly logo: AssetPath;
  readonly symbol: AssetPath;
  readonly ogImage: AssetPath;
}

export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly socialProfiles: readonly AbsoluteUrl[];
  readonly titleTemplate: `%s | ${string}`;
  readonly description: string;
  readonly contactEmail: string;
  readonly deploymentStage: DeploymentStage;
  readonly allowIndexing: boolean;
  readonly brand: BrandAssetPaths;
  readonly urls: SiteUrlConfig;
}

export interface LinkDefinition {
  readonly label: string;
  readonly href: SiteHref;
  readonly external?: boolean;
}

export interface HeaderNavItem extends LinkDefinition {
  readonly id: "work" | "services" | "about" | "contact";
}

export interface ServiceCardContent {
  readonly id: "custom-software" | "automation-integrations" | "operations-systems" | "data-intelligence";
  readonly title: string;
  readonly description: string;
  readonly supportingTopics: readonly string[];
}

export interface ProcessStepContent {
  readonly id: "discover" | "prototype" | "build" | "improve";
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
}

export interface DemoMetric {
  readonly label: string;
  readonly value: string;
  readonly context?: string;
  readonly trend: "up" | "down" | "neutral";
  readonly delta: string;
}

export interface DemoListItem {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
}

export interface DemoPanel {
  readonly title: string;
  readonly items: readonly DemoListItem[];
}

export interface DemoChartPoint {
  readonly label: string;
  readonly value: number;
}

export interface DemoHeroPreview {
  readonly appName: string;
  readonly heading: string;
  readonly summary: string;
  readonly metrics: readonly DemoMetric[];
  readonly chartTitle: string;
  readonly chartSeries: readonly DemoChartPoint[];
  readonly sideListTitle: string;
  readonly sideListItems: readonly DemoListItem[];
  readonly lowerPanels: readonly DemoPanel[];
}

export interface DemoPreviewCardContent {
  readonly title: string;
  readonly useCase: string;
  readonly outcome: string;
}

export interface DemoRouteCardContent {
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly availabilityNote: string;
}

export type DemoLink =
  | {
      readonly kind: "internal";
      readonly href: InternalHref;
    }
  | {
      readonly kind: "external";
      readonly href: AbsoluteUrl;
    };

export interface DemoDestination {
  readonly tier: DemoTier;
  readonly availabilityLabel: string;
  readonly link: DemoLink | null;
  readonly linkLabel: string;
}

export interface DemoExperience {
  readonly id: DemoId;
  readonly title: string;
  readonly shortLabel: string;
  readonly category: string;
  readonly heroTabLabel: string;
  readonly heroCaption: string;
  readonly destination: DemoDestination;
  readonly previewCard: DemoPreviewCardContent;
  readonly routeCard: DemoRouteCardContent;
  readonly heroPreview: DemoHeroPreview;
}

export interface HomeHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly primaryCta: LinkDefinition;
  readonly secondaryCta: LinkDefinition;
  readonly demoOrder: readonly DemoId[];
}

export interface ServicesSectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly cards: readonly ServiceCardContent[];
}

export interface DemosPreviewSectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly tierNote?: string;
  readonly demoOrder: readonly DemoId[];
  readonly cta: LinkDefinition;
}

export interface AboutContactSectionContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly responseNote: string;
  readonly process: readonly ProcessStepContent[];
  readonly contact: {
    readonly email: string;
    readonly formTitle: string;
    readonly formDescription: string;
  };
}

export interface FinalCtaContent {
  readonly title: string;
  readonly description: string;
  readonly primaryCta: LinkDefinition;
  readonly secondaryCta?: LinkDefinition;
}

export interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly LinkDefinition[];
}

export interface FooterContent {
  readonly brandSummary: string;
  readonly contactLabel: string;
  readonly email: string;
  readonly linkGroups: readonly FooterLinkGroup[];
  readonly legalLinks: readonly LinkDefinition[];
}

export interface StartProjectRouteContent {
  readonly title: string;
  readonly description: string;
  readonly primaryAction: LinkDefinition;
  readonly secondaryAction: LinkDefinition;
}

export interface DemosRouteContent {
  readonly title: string;
  readonly description: string;
  readonly demoOrder: readonly DemoId[];
}

export interface SharedRouteLabels {
  readonly bookCall: string;
  readonly sendProjectDetails: string;
  readonly exploreDemos: string;
  readonly viewServices: string;
}

export interface LandingSiteContent {
  readonly routeMap: {
    readonly home: InternalRoute;
    readonly contact: InternalRoute;
    readonly demos: InternalRoute;
    readonly privacy: InternalRoute;
    readonly terms: InternalRoute;
    readonly startProject: InternalRoute;
    readonly startProjectBook: InternalRoute;
    readonly startProjectIntake: InternalRoute;
    readonly servicesAnchor: AnchorRoute;
    readonly demosAnchor: AnchorRoute;
    readonly aboutAnchor: AnchorRoute;
  };
  readonly externalReferences: {
    readonly pantryApp: AbsoluteUrl;
    readonly kitchenInventoryDemo: AbsoluteUrl;
    readonly bookingsWebsiteDemo: MaybeAbsoluteUrl;
    readonly operationsDashboardDemo: MaybeAbsoluteUrl;
  };
  readonly navigation: {
    readonly header: readonly HeaderNavItem[];
    readonly primaryCta: LinkDefinition;
  };
  readonly sharedLabels: SharedRouteLabels;
  readonly home: {
    readonly hero: HomeHeroContent;
    readonly services: ServicesSectionContent;
    readonly demosPreview: DemosPreviewSectionContent;
    readonly aboutContact: AboutContactSectionContent;
    readonly finalCta: FinalCtaContent;
  };
  readonly startProject: StartProjectRouteContent;
  readonly demosRoute: DemosRouteContent;
  readonly footer: FooterContent;
}

export interface GeneralContactFormInput {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export interface ProjectIntakeFormInput {
  readonly name: string;
  readonly email: string;
  readonly business: string;
  readonly projectNeeds: string;
}

export interface MockBookingSlot {
  readonly id: string;
  readonly label: string;
  readonly startsAt: string;
  readonly endsAt: string;
}

export interface MockBookingDay {
  readonly id: string;
  readonly label: string;
  readonly dateLabel: string;
  readonly slots: readonly MockBookingSlot[];
}

export interface BookingSubmissionInput {
  readonly slotId: string;
  readonly name: string;
  readonly email: string;
  readonly business: string;
}

export interface MockRequestOptions {
  readonly delayMs?: number;
  readonly simulate?: MockSubmissionState;
}

export interface MockSubmissionResult<TPayload = undefined> {
  readonly state: MockSubmissionState;
  readonly submissionId: string | null;
  readonly message: string;
  readonly payload: TPayload;
}
