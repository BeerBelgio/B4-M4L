# B4~M4L — Changelog

Changes to the **public documentation website** are recorded here. Device software versions and their development histories are managed independently.

## 0.13.1 — Maintenance candidate (unreleased)

### Accessibility and responsive UI
- Limited translations and their downloads to device HELP content; homepage, Privacy and product presentation stay English.
- Added intrinsic dimensions to homepage wordmarks and destination-specific accessible names to device CTA links.
- Placed EXPLORE DEVICES directly after the mobile wordmark in the DOM, preserving the desktop composition and session layout schema.
- Centred the mobile footer signature with the original middle dot; kept device-title accents upright.
- Applied the approved QUICK GUIDE colour inversion, arranged mobile HELP/documentation/language objects and centred accordion symbols geometrically.
- Restored device development histories independently of testing/distribution status. Current illustrated guide targets remain Bridge 1.3 / DEV3 and CONSEQUENCE OF TIME 0.1.6.5.

### Layout stability
- Reserved the approved desktop canvas, toolbar and default object geometry before deferred editor initialization. Saved positions, drag/resize constraints and LOCK / EDIT / RESET remain supported.


### Performance
- Converted Barlow Condensed web delivery from 18 original TTF faces to matching, validated WOFF2 counterparts (approximately 62.6% smaller source-font payload). Original TTF assets remain archived in the repository; no changes to typography, device content or JavaScript behavior.

## 0.13 — Initial public release (2026-10-20)

The first public release of **B4~M4L**, BeerBelgio's documentation and support website for Max for Live devices.

### What's included

- A patch-inspired, interactive homepage with movable and resizable objects, animated connections and LOCK / EDIT / RESET controls on supported desktop browsers.
- Dedicated pages for **INDEX HTML BRIDGE** and **CONSEQUENCE OF TIME**, with device overviews, illustrated guides, compatibility and status information, changelogs and support links.
- Documentation in English and Italian, with automatic German, Spanish and French HELP translations.
- Responsive layouts for desktop and smaller screens, local font assets and browser-side preferences.
- Stable device HELP URLs designed for links from the devices themselves.
- Site-specific canonical URLs, sharing metadata and an XML sitemap, coordinated with the BeerBelgio hub's indexing structure.
- A public Privacy notice and a standalone GitHub Pages deployment without third-party runtime dependencies.

### Device status at launch

The website is publicly available, but **the devices documented here remain in testing and are not being distributed through this repository**.

- **INDEX HTML BRIDGE:** 1.3 testing candidate (internal build identifier: DEV3-2026-10-19).
- **CONSEQUENCE OF TIME:** 0.1.6.5 testing candidate.

This release establishes the public website baseline. Later entries will describe changes made *after* 0.13.
