import {createRequire} from "module";
import {defineConfig} from "vitepress";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export default defineConfig({
  lang: "en-US",
  description: "A automated live stream recording tool",

  themeConfig: {
    nav: nav(),

    lastUpdated: {
      text: "Last Updated",
      formatOptions: {
        forceLocale: true,
      }
    },

    sidebar: sidebarGuide(),

    socialLinks: [
      {icon: "github", link: "https://github.com/stream-rec/stream-rec"},
    ],

    footer: {
      message:
          'Released under the <a href="https://github.com/stream-rec/stream-rec/blob/main/LICENSE">MIT License</a>.',
      copyright:
          'Copyright © 2024-present <a href="https://github.com/hua0512">@hua0512</a>',
    },

    editLink: {
      pattern:
          "https://github.com/stream-rec/stream-rec-pages/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function nav() {
  return [{text: "Home", link: "/"}];
}

function sidebarGuide() {
  return [
    {
      text: "Get Started",
      items: [
        {text: "What is Stream-rec", link: "/what-is-stream-rec"},
        {text: "Supported platforms", link: "/supported-platforms"},
        {text: "Installation", link: "/installation"},
        {text: "Changelog", link: "/changelog"},
      ],
    },
    {
      text: "Usage",
      items: [
        {text: "Engines", link: "/engines"},
        {text: "Configuration", link: "/configuration"},
        {text: "Troubleshooting", link: "/troubleshooting"},
        // { text: "Advanced usage", link: "/advanced-usage" },
        // { text: "FAQ", link: "/faq" },
      ],
    },
    {
      text: "Api Reference",
      collapsed: true,
      items: [{text: "Api guide", link: "/api-guide"}],
    },

    {
      text: "About",
      items: [
        {text: "Contributing", link: "/contributing"},
        {text: "Credits", link: "/credits"},
        {text: "License", link: "/license"},
      ],
    },
  ];
}
