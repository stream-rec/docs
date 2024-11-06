import { createRequire } from "module";
import { defineConfig } from "vitepress";

const require = createRequire(import.meta.url);
const pkg = require("vitepress/package.json");

export default defineConfig({
  lang: "zh-CN",
  description: "自动化直播录制工具",

  themeConfig: {
    nav: nav(),

    lastUpdatedText: "最后更新",

    sidebar: sidebarGuide(),

    socialLinks: [
      { icon: "github", link: "https://github.com/stream-rec/stream-rec" },
    ],

    footer: {
      message:
        '在  <a href="https://github.com/stream-rec/stream-rec/blob/main/LICENSE">MIT License</a> 许可证下发布。',
      copyright:
        'Copyright © 2024-现在 <a href="https://github.com/hua0512">@hua0512</a>',
    },

    editLink: {
      pattern:
        "https://github.com/stream-rec/stream-rec-pages/edit/main/docs/:path",
      text: "在 GitHub 中编辑本页",
    },
  },
});

function nav() {
  return [{ text: "主页", link: "/" }];
}

function sidebarGuide() {
  return [
    {
      text: "开始",
      items: [
        { text: "介绍", link: "/zh_CN/what-is-stream-rec" },
        { text: "平台支持", link: "/zh_CN/supported-platforms" },
        { text: "安装", link: "/zh_CN/installation" },
        { text: "更新日志", link: "/zh_CN/changelog" },
      ],
    },
    {
      text: "使用",
      items: [
        { text: "下载引擎", link: "/zh_CN/engines" },
        { text: "配置", link: "/zh_CN/configuration" },
        // { text: "Advanced usage", link: "/zh_CN/advanced-usage" },
        // { text: "FAQ", link: "/zh_CN/faq" },
      ],
    },
    {
      text: "开发者",
      collapsed: true,
      items: [{ text: "Api 文档", link: "/zh_CN/api-guide" }],
    },

    {
      text: "关于",
      items: [
        { text: "贡献", link: "/zh_CN/contributing" },
        { text: "感谢", link: "/zh_CN/credits" },
        { text: "许可证", link: "/zh_CN/license" },
      ],
    },
  ];
}
