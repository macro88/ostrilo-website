# Content and release sources

Product source reviewed on 7 October 2026 at extension revision
`d70a0c1e83087a4db6593fc8658912f70767fd6c`.
The website is an independent repository. It does not read private extension
files or fetch product metadata at build time. Refresh the release metadata in
`src/data/site.ts` together with content when the extension changes.

The site uses `ostrilo.com` and lives at `macro88/ostrilo-website`. The public
roadmap follows the extension's
`docs/roadmap.md`. The site is promotional: lead with useful capabilities,
keep unfinished work on the roadmap, and avoid repeating readiness caveats.

Ostrilo 0.9.0 was published in the
[Chrome Web Store](https://chromewebstore.google.com/detail/ostrilo/nhodljdjlljpapclgcjmhajpgodanchk)
on 9 October 2026. The public listing and extension repository visibility were
verified that day. Installation copy leads with the store release, with source
builds available as an alternative. The product source review above remains
the basis for capability claims.

## Claims and provenance

| Subject                                  | Source in the extension repository                          |
| ---------------------------------------- | ----------------------------------------------------------- |
| Current version and first use            | `package.json`, `README.md`, `CHANGELOG.md`                 |
| Signing interface                        | `src/extension/injected.ts`                                 |
| Protected kinds and trust policy         | `src/domain/policy/trust-definitions.ts`                    |
| Vault encryption and migration           | `docs/vault-storage-format.md`                              |
| Encrypted first-key backup               | `docs/key-backup.md`, `README.md`                           |
| Password changes and settings locality   | `docs/roadmap.md`, `CHANGELOG.md`                           |
| Network, images, sync, and local records | `PRIVACY.md`, effective 6 October 2026                      |
| Reporting vulnerabilities                | `SECURITY.md`                                               |
| Built / next / later roadmap             | `docs/roadmap.md` status reconciliation and foundation gaps |
| Independent review milestone             | `README.md` requirements for 1.0                            |
| Testing and CI claims                    | `docs/TESTING.md`, `docs/ci-verification.md`                |

The source privacy policy is newer than some README wording: profile images
are not loaded from remote hosts in 0.9.0, and image uploading was removed.
Use the policy for this specific behavior. Do not copy the older image claims.

## External primary references

- [NIP-07](https://github.com/nostr-protocol/nips/blob/master/07.md), checked for the browser-provider contract.
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), checked for static deployment and base paths.
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), checked for artifact and deployment permissions.
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), linked for the hosting provider's data handling.

## Assets and writing review

The original mascot and populated light/dark screenshots were copied from the
extension source, preserved as source images, and optimized by Astro at build
time. The social image was copied from `docs/brand/github-social-preview.png`.
No stock images, regenerated mascot, or external image URLs are used.

The supplied Atlas design handoff is a reference, not a production dependency.
Its layout and copy suggestions informed the review. Product claims and the
final promotional content were researched against the extension source.

The blog-voice-editor review checked factual integrity, attribution, specificity,
flow, clarity, reader value, and prose patterns. No testimonials, audit badge,
user counts, delivery dates, or unsupported compatibility claims were invented.
The product copy explains signing control and identity management, while the
roadmap labels future work. Security and privacy pages link technical detail.
The rendered website was reviewed and accepted before publication setup.
