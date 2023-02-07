import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "旭辉的个人网站",
      description: "旭辉的个人网站，分享日常、交流技术",
    },
  },

  theme,

  shouldPrefetch: false,
});
