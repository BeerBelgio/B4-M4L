# B4~M4L

**Documentation, changelogs and support for BeerBelgio Max for Live devices, in a patch-inspired environment.**

**[Visit B4~M4L](https://beerbelgio.github.io/b4-m4l/)**

B4~M4L is the documentation home for Max for Live devices developed by BeerBelgio. It brings together guides, compatibility notes, version information and support resources in an interactive website inspired by the visual language of Max patchers.

The site is not a device host or a distribution platform: each device is developed independently, and downloads or purchases, when available, are handled through their respective external product pages.

## Current website — 0.13.3 FINAL

**0.13.3 was approved as the website's FINAL baseline on 23 October 2026**, after merge to `main`, a successful GitHub Pages deployment and owner verification of the updated Bridge HELP. This PATCH release refines the Bridge title, UNMAP troubleshooting, mobile documentation layout, scrollable version histories and language-request action without changing the approved Max-style behavior.

The formal GitHub Release/tag is a separate publishing record and must be created against the approved `main` commit; website FINAL does **not** declare either documented Max for Live device FINAL or ready for public distribution.

The earlier 0.13.2 update is retained in the changelog as historical documentation.

## Device documentation

- **[Bridge](https://beerbelgio.github.io/b4-m4l/index-html-bridge/#help)** — connects Ableton Live to INDEX HTML, its first supported ecosystem. This candidate documents **1.3 testing**, including the complete-folder packaging checked on M5 on 22 October 2026. Intel acceptance, redistribution clearance and final device-side guide validation remain separate.
- **[CONSEQUENCE OF TIME](https://beerbelgio.github.io/b4-m4l/consequence-of-time/#help)** — an audio/time-responsive modulation device. The illustrated guide covers **0.1.6.5**. The history separately records completed scoped M5 checks on a newer private 0.1.6.9 packaging candidate, without implying Intel acceptance or public availability.

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
