window.INDEX_HELP_MANIFEST = {
  "schemaVersion": 1,
  "documentationVersion": "0.13.3",
  "device": {
    "name": "Bridge",
    "build": "bridge-1.3-distribution-embedded-2026-10-22",
    "publicVersion": "1.3",
    "releaseStatus": "testing_not_distributed"
  },
  "distribution": {
    "publicRelease": false,
    "download": null
  },
  "versionHistory": [
    {
      "version": "1.3",
      "date": "2026-10-22",
      "title": "Testing milestones",
      "changes": [
        "Bridge is the product name; INDEX HTML is its first supported ecosystem. These milestones describe development, not an available public release."
      ],
      "milestones": [
        {
          "date": "2026-10-22",
          "title": "Complete-folder packaging and scoped M5 checks",
          "changes": [
            "Embedded the five existing native UI modules and consolidated the testing layout as Bridge.amxd plus Support, preserving controls and behaviour.",
            "Scoped M5 checks covered loading and relocation, rendering, MIDI, mapping, automation, recall, browser lifecycle and HELP launch. Intel acceptance, redistribution clearance and final public-guide review remain pending."
          ]
        },
        {
          "version": "1.3",
          "date": "2026-10-21",
          "title": "Testing preparation",
          "changes": [
            "Improved isolation and cleanup of the live Chromium window, with a complete-folder testing package.",
            "A Live/LFO Remote-unmapping limitation after Set recall remains documented as a known limitation, not a Bridge fix. Independent Intel acceptance is pending."
          ]
        },
        {
          "version": "1.3",
          "date": "2026-10-19",
          "title": "Interface and recall milestone",
          "changes": [
            "Refined the Core, Layer and Performance panels and HELP access.",
            "Corrected synchronization of the selected editing Layer after Set recall; retained parameter identities and stored values."
          ]
        }
      ]
    },
    {
      "version": "1.2",
      "date": "2026-10-18",
      "title": "Performance-only development milestone",
      "changes": [
        "Refined the Core and MIDI-assigned control feedback.",
        "Introduced a dedicated Chromium output per instance and a guide focused on the five-layer live workflow."
      ]
    },
    {
      "version": "1.1",
      "date": null,
      "title": "First performance-only derivative",
      "changes": [
        "Established the performance-only branch from the earlier prototypes; recording/export experiments are outside the current product."
      ]
    },
    {
      "version": "0.23.9-rc.3",
      "date": "2026-10-14",
      "title": "Earlier prototype",
      "changes": [
        "Refined timing, retry and output-file handling in the historical recording/export prototype. This workflow is not included in the current 1.x product."
      ]
    },
    {
      "version": "0.23.9-rc.2",
      "date": "2026-10-13",
      "title": "Earlier prototype",
      "changes": [
        "Refined host-clock and audio-file ownership checks, together with the historical export controls."
      ]
    },
    {
      "version": "0.23.9-rc.1",
      "date": "2026-10-13",
      "title": "Earlier prototype",
      "changes": [
        "Added conservative job-owned resource handling and validation of exported files; retired the public PNG-output option."
      ]
    },
    {
      "version": "0.23.8-rc.2",
      "date": "2026-10-13",
      "title": "Earlier prototype",
      "changes": [
        "Replaced the performance display with a native read-only dial and explicit activity colours."
      ]
    },
    {
      "version": "0.23.8-rc.1",
      "date": "2026-10-12",
      "title": "Earlier prototype",
      "changes": [
        "Explored performance-display feedback and resource lifecycle handling."
      ]
    },
    {
      "version": "0.23.7-rc.1",
      "date": "2026-10-12",
      "title": "Earlier prototype",
      "changes": [
        "Added per-Set tool-state persistence, native tool hosting and performance-monitor updates."
      ]
    },
    {
      "version": "0.23.6",
      "date": null,
      "title": "Native tool-hosting milestone",
      "changes": [
        "Added native INDEX tool hosting, capability validation and native parameter/drawing paths with legacy compatibility."
      ]
    },
    {
      "version": "0.23.5",
      "date": null,
      "title": "Performance-monitor milestone",
      "changes": [
        "Introduced a read-only performance display and full-window resolution framing."
      ]
    },
    {
      "version": "0.23.0",
      "date": null,
      "title": "Historical local reference",
      "changes": [
        "Preserved local development reference for the earlier architecture; no public release date is asserted."
      ]
    }
  ],
  "documentationNote": "This guide describes Bridge 1.3, including the complete-folder testing package checked on Apple M5 on 22 October 2026. The existing 1.3 interface illustrations are retained. Independent Intel acceptance, redistribution clearance and device-side validation of this updated guide are still pending."
};
