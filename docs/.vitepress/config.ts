import { defineConfig, SiteConfig } from "vitepress";
import locales from "./locales";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Stream-rec",
  locales: locales.locales,
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          zh: {
            // make this `root` if you want to translate the default locale
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "输入",
                  navigateText: "导航",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "esc",
                },
              },
            },
          },
        },
      },
    },
  },
});