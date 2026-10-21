# B4~M4L

**Documentation, changelogs and support for BeerBelgio Max for Live devices, in a patch-inspired environment.**

**[Visit B4~M4L](https://beerbelgio.github.io/b4-m4l/)**

B4~M4L is the documentation home for Max for Live devices developed by BeerBelgio. It brings together guides, compatibility notes, version information and support resources in an interactive website inspired by the visual language of Max patchers.

The site is not a device host or a distribution platform: each device is developed independently, and downloads or purchases, when available, are handled through their respective external product pages.

## Maintenance candidate 0.13.1

This standalone maintenance candidate follows the published 0.13 release. It refines layout stability, responsive HELP and footer presentation, device-link accessibility and HELP-only translations. The existing WOFF2 delivery and original font licences are retained. It has not been deployed.

## Device documentation

- **[INDEX HTML BRIDGE](https://beerbelgio.github.io/b4-m4l/index-html-bridge/#help)** — a performance-oriented connection between Ableton Live and INDEX HTML. Documentation currently covers the **1.3 testing candidate**.
- **[CONSEQUENCE OF TIME](https://beerbelgio.github.io/b4-m4l/consequence-of-time/#help)** — an audio/time-responsive modulation device. Documentation currently covers the **0.1.6.5 testing candidate**.

**Both devices are currently in testing; neither is offered for public download through this site.** Documentation and device release status are separate.

## Explore the site

On desktop, the homepage behaves like a small patch: objects can be moved and resized in EDIT mode, connected visually by animated patch cords. LOCK fixes the composition; RESET restores its default layout. Layout changes are stored for the current browser-tab session. Smaller screens use a fixed responsive presentation.

Only HELP content is translated; the general website and device presentation remain in English. HELP content is available in English and Italian, with automatic German, Spanish and French translations provided for convenience and subject to editorial review.

## Related projects

- [BeerBelgio — personal hub](https://beerbelgio.github.io/)
- [INDEX HTML](https://beerbelgio.github.io/index-html/)
- [BeerBelgio on maxforlive.com](https://maxforlive.com/profile/user/BeerBelgio)
- [BeerBelgio on Ko-fi](https://ko-fi.com/beerbelgio)

## Project and deployment

This repository contains the **public, self-contained static website**, not the Max for Live device source code or internal development reports.

It is hosted via GitHub Pages under `/b4-m4l/`. HTML, CSS, JavaScript, graphics and locally hosted fonts are served directly without third-party runtime libraries or a build step. Keep the folder structure intact when deploying. The `.nojekyll` file disables GitHub Pages' Jekyll processing.

The project-specific [sitemap](https://beerbelgio.github.io/b4-m4l/sitemap.xml) covers its public pages. The main BeerBelgio hub coordinates indexing across related projects.

The fonts included in `assets/fonts/` retain their own SIL Open Font Licenses (`OFL.txt`); those licenses do not imply a license for the entire website or artwork. All rights not otherwise licensed are reserved.

## Support

For questions, feedback or reporting a problem: [matteo.sonodgtl@gmail.com](mailto:matteo.sonodgtl@gmail.com).

For changes to the public website, see [CHANGELOG.md](CHANGELOG.md).

---

© 2026 BeerBelgio · *Fun is a serious thing.*
