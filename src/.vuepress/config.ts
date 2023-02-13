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

  head: [['script', { type: "text/javascript" }, "(function(c,l,a,r,i,t,y){c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };t=l.createElement(r); t.async = 1; t.src =\"https://www.clarity.ms/tag/\"+i;y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);})(window, document, \"clarity\", \"script\", \"ftnd1dn8el\");"],],

  theme,

  shouldPrefetch: false,
});
