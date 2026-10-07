# Website design review

Reviewed the production Astro build on 7 October 2026. Inkline and Deep Ink
are used as separate role assignments. The original mascot remains unchanged.

## Direction

The homepage leads with local keys and signing decisions. Its distinctive
element is a small interactive approval walkthrough with an origin, identity,
event kind, payload, raw example event, and approve/deny outcomes. It is visibly
illustrative and never connects to the extension. The rest of the site uses
quiet surfaces, original Inkline colours, Archivo, JetBrains Mono for data,
hairline dividers, and one notched navigation CTA.

The supplied Atlas handoff informed the practical content and index navigation.
The site's structure and promotional voice emphasize capabilities throughout
the homepage and security page. Future work belongs on the roadmap.

## Captures and findings

`node scripts/capture-screenshots.mjs` captures every page at 390px and 1440px
in both light and dark, plus approved and denied walkthrough states. Captures
are stored in `test-results/design-review`, outside the public build. The product
section uses the extension's existing production captures from a populated test
vault in both themes, with two keys, three relays, permissions, and signing
activity. This task does not alter the extension or claim a fresh extension
runtime acceptance.

Initial review found two contrast issues: secondary text on the violet-soft
roadmap callout, and the red first-visit label on a red-soft surface. The callout
now uses primary text, and the first-visit label uses the normal card surface.
Both pass the browser accessibility checks without rule exclusions.

The first cross-browser run also exposed test setup issues: Firefox needed the
build matched to Playwright 1.63.0; lazy-loaded images needed to be scrolled into
view before checking their load status; WebKit on macOS follows Option-Tab for
full keyboard navigation. These are addressed in the runner without skipping
any browser or assertion.

Visual review checked headline wrapping, page-index wrapping, navigation,
long content rows, both populated product captures, visible focus, and callouts.
No gradients, accent rails, dot patterns, candy palette, decorative metrics, or
stock illustrations were introduced. Motion is limited to short button feedback,
with reduced-motion handling.

## Verification

Astro Check reports no errors, warnings, or hints. Production builds pass.
The browser matrix passes in Chromium, Firefox, and WebKit, including WCAG
A/AA axe checks at both widths and in both themes, interaction checks,
local-only requests, and use without JavaScript. The pinned aislop and React
Doctor scans each score 100/100, without suppressed rules.

Review has no remaining visual or interaction findings at the tested widths.
Live GitHub deployment is a separate external step.

The full 27-test suite also passes with a fresh production server and
`SITE_BASE=/ostrilo-website/`. Internal destinations, anchors, image assets,
canonical URLs, and crawler endpoints work under the repository prefix.
Playwright starts Astro preview in the foreground with `--ignore-lock` so
agent-environment background startup cannot escape its server lifecycle.
