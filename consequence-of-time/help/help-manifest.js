window.B4M4L_COT_HELP_MANIFEST = {
  "schemaVersion": 1,
  "documentationVersion": "0.12",
  "device": {
    "name": "Consequence of Time",
    "build": "0.1.6.4",
    "workingReference": "0.1.6.3",
    "releaseStatus": "testing_staging_not_distributed",
    "revision": "REV10"
  },
  "environment": {
    "appleSilicon": {
      "live": "12.4.2 Standard",
      "max": "9.1.4 bundled",
      "status": "Scoped exact 0.1.6.4 prepared-runtime audio, A/B Remote, C Mod and cold recall evidence; Remote Unmap known limitation retained; exact SC not tested."
    },
    "intel": {
      "referenceBuild": "0.1.6.2",
      "status": "Earlier Intel sidechain and C Unmap results are USER_REPORTED PASS for 0.1.6.2. Exact 0.1.6.4 is NOT TESTED."
    },
    "windows": "untested",
    "minimumVersions": "not certified"
  },
  "controls": {
    "timeGateMs": {
      "min": 0,
      "max": 2000,
      "default": 0,
      "step": 5
    },
    "accel": {
      "min": -10,
      "max": 10,
      "default": 0.5
    },
    "mixed": {
      "combine": [
        "Sum",
        "Average",
        "Difference",
        "Ratio A/B",
        "Ratio B/A",
        "Multiply",
        "Distance",
        "Audio Thru",
        "Time Thru"
      ],
      "amount": {
        "min": -10,
        "max": 10,
        "default": 1
      },
      "mathPeriodBeats": {
        "min": 1,
        "max": 64,
        "default": 8
      },
      "mathPeriodMs": {
        "min": 100,
        "max": 60000,
        "default": 4000
      },
      "activityTransition": 0.01,
      "neutralThru": "exact A/B identity"
    }
  },
  "knownIssues": [
    "Remote Unmap after recall may leave target locked; also observed in a separate stock-only M5 test. Cause unproven; no reliable workaround promised.",
    "Exact 0.1.6.4 external sidechain, Intel and Windows validation pending.",
    "Independent installation blocked; portability and redistribution unresolved."
  ],
  "distribution": {
    "publicRelease": false,
    "redistributionPermission": "unresolved for stock/embedded components and related resources",
    "download": null,
    "publication": "blocked"
  },
  "translationStatus": {
    "en": "current technical draft",
    "it": "existing copy plus explicitly English current notes; technical review pending",
    "de": "existing copy plus explicitly English current notes; technical review pending",
    "es": "existing copy plus explicitly English current notes; technical review pending",
    "fr": "existing copy plus explicitly English current notes; technical review pending"
  },
  "mappingNotes": {
    "remoteToMod": "last absolute position may become the new relative base; accepted behavior",
    "legacySetMigration": "not required for this unreleased device; verify new-Set recall",
    "unmap": "check real target release, not only an empty Map label"
  },
  "illustrations": {
    "render": "total.svg",
    "main": "core.svg",
    "audio": "audio.svg",
    "time": "time.svg",
    "mixed": "mixed.svg",
    "sidechain": "sc.svg",
    "details": [
      "behaviour-message.svg",
      "combine-message.svg"
    ],
    "status": "Supplied outlined-text SVG panels with embedded PNGs. Detail viewBoxes preserve the supplied raster message content; no new rasterization or tracing. Rights remain a separate publication review."
  },
  "documentationSnapshot": {
    "siteVersion": "0.12",
    "reviewed": "2026-10-19",
    "sourceBuild": "0.1.6.4 REV10 post-HELP",
    "status": "internal testing candidate; independent installation blocked; no public release",
    "source": "Current DEVICE-SPEC, HELP/UI manifests and editorial handoff; see DEVICE-DOC-SYNC-v0.12.md"
  },
  "verification": {
    "M5": "Scoped prepared-runtime audio, A/B Remote, C Mod and cold recall evidence. Not a global Runtime PASS.",
    "Intel": "Exact 0.1.6.4 NOT TESTED; earlier user reports remain build-specific.",
    "Windows": "NOT TESTED",
    "independentInstallation": "BLOCKED",
    "portability": "UNKNOWN",
    "redistribution": "UNKNOWN",
    "publicHelp": "H4 pending publication and final native URL test",
    "knownLimitation": "Remote Unmap after recall may leave target locked; also observed in a separate stock-only M5 test. Cause unproven; no reliable workaround promised."
  }
};
