# Ostrilo website

The public Astro website for [Ostrilo Signer](https://github.com/macro88/ostrilo),
an MIT-licensed local Nostr signer. Product, security, roadmap, developer,
getting-started, and privacy pages, with an illustrative signing walkthrough.

## Develop and verify

Use Node.js 24 and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Production review and checks:

```sh
pnpm run format:check
pnpm run compile
pnpm run build
pnpm exec playwright install chromium firefox webkit
pnpm run test
pnpm run quality
pnpm audit --audit-level high
pnpm run preview
node scripts/capture-screenshots.mjs
```

Preview runs at `http://localhost:4321`. Browser checks cover both themes at 390px
and 1440px, WCAG A/AA axe checks, navigation, internal links, demo decisions,
theme controls, local-only requests, and use without JavaScript. Screenshot
artifacts live under gitignored `test-results/design-review`.

`pnpm run quality` runs the exact local aislop and React Doctor binaries and
requires both scores to be at least 95. Target: 100. It fails for missing scores
or incomplete checks. Network access is needed for the dependency audit and
React Doctor score service. No rules are suppressed or turned off.

aislop 0.18.0 analyses the JavaScript and TypeScript files, including the React
walkthrough and scripts. Its scope does not include Astro templates or CSS.
Astro Check, Prettier, React Doctor, browser tests, and visual review cover those
surfaces separately. A quality score is not a security assessment of the signer.

The installation policy retains a one-day release age, provenance downgrade
checks, and explicitly allowed build scripts. `chokidar` 5.0.0 and `semver` 7.8.5
are provenance-attested overrides for older transitive releases. The current
Astro check, build, and development startup verify their compatibility here.

## Content and launch

See [content sources](docs/content-sources.md) before updating claims.
`src/data/site.ts` holds the reviewed extension version and launch URL.
`src/data/roadmap.json` holds the source-backed built/next/later groups.

The site currently announces the Chrome Web Store launch as coming soon. When
the listing is live, set `release.chromeStoreUrl` to the verified HTTPS listing,
update the launch copy in the home and start pages, and refresh the release
metadata. Do not invent a listing URL or ship an inactive installation button.

The browser walkthrough is example data only. It never connects to `window.nostr`,
generates keys, or signs an event. The original mascot, social preview, and
populated extension captures are bundled locally. Fonts are bundled too.

## GitHub Pages

The workflow verifies pull requests and pushes to `main`. A successful main build
publishes its `dist` artifact to GitHub Pages. PRs cannot publish.

Before the first remote deployment:

1. Create the public `macro88/ostrilo-website` repository and push this local
   `main` when ready.
2. Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
3. Verify domain ownership in GitHub's account Pages settings, then set the
   repository's Pages custom domain to `ostrilo.com` before changing DNS.
4. Configure the apex domain with an ALIAS/ANAME to `macro88.github.io` or the
   four GitHub Pages A records: `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, and `185.199.111.153`. For `www`, use a CNAME pointing to
   `macro88.github.io`. Enable **Enforce HTTPS** after domain validation.
5. Confirm that both workflow jobs succeed and check the live site on mobile
   and desktop, including navigation, GitHub links, the signing walkthrough,
   social preview, sitemap, and HTTPS redirect.

See GitHub's [custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
for current DNS values and domain verification. DNS and certificate provisioning
can take up to 24 hours.

The build defaults to `SITE_URL=https://ostrilo.com` and `SITE_BASE=/`, with
`public/CNAME` documenting the intended domain. GitHub Actions deployments ignore
that file: the custom domain must be saved in Pages settings. Canonical, social,
sitemap, and local URLs derive from the build configuration.

For a temporary repository-path deployment, remove `public/CNAME` and set the
repository variables `SITE_URL=https://macro88.github.io` and
`SITE_BASE=/ostrilo-website/`. Test the same configuration locally:

```sh
SITE_URL=https://macro88.github.io SITE_BASE=/ostrilo-website/ pnpm run build
SITE_URL=https://macro88.github.io SITE_BASE=/ostrilo-website/ pnpm run test
```

CI uses commit-pinned actions, a frozen lockfile, formatting, type checks, the
production build, all three browsers, both quality floors, and an audit blocking
high and critical findings. Only the deploy job has Pages write permissions.

Source repositories and GitHub documentation links point to their intended public
locations. The extension is being prepared for public release, so some links may
require access until its repository is public. Repository settings, DNS, and live
deployment are external setup steps, not confirmed by a local build.

## License

[MIT](LICENSE) · © 2026 Ostrilo contributors. Third-party dependencies retain
their own licenses.
