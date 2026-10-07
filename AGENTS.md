# Ostrilo website

This is the public Astro site for Ostrilo Signer. Application source stays in
`../ostrilo`. Keep private knowledge-vault paths and project notes outside this
public repository. Follow any separately configured knowledge-capture agreement.

Read `docs/content-sources.md` before changing product claims or the roadmap.
Marketing leads with what people can do. Keep future capabilities on the roadmap,
avoid unsupported security assurances, and link technical detail to the source.
Use the blog-voice-editor skill, when available, for substantive copy changes and review.

Follow the extension's `docs/design/DESIGN_RULES.md`: Inkline colours, Archivo
and JetBrains Mono, original mascot, quiet surfaces, hairline borders. No
gradients, accent rails, dot grids, candy colours, or decorative metric cards.
Tokens belong in `src/styles/global.css`. Judge both themes on mobile and desktop
using the populated extension captures, and record findings in
`docs/design-review/README.md`.

Use pnpm with the exact versions and committed lockfile. Do not fetch aislop or
React Doctor with npx, dlx, or `@latest`. Do not weaken supply-chain policies,
suppress findings to improve a score, or exclude authored source from checks.
After code edits, run `pnpm run compile`, `pnpm run build`, `pnpm run test`,
`pnpm run slop:changes`, `pnpm run quality`, and `pnpm audit --audit-level high`.
Both quality tools must return at least 95, with 100 the target. Missing scores
and skipped checks fail verification. The quality script needs network access
for the audit and React Doctor score service.

Preview the production build with `pnpm run preview`. Capture pages with
`node scripts/capture-screenshots.mjs`. No telemetry, remote fonts, tracking,
third-party embeds, or real extension connection belongs on this website.
The example signing walkthrough must never create keys or signatures.

Keep commit metadata suitable for a public repository, including a public or
GitHub no-reply email address. Publishing happens through the workflow after a
push or merge to main, once verification passes.
