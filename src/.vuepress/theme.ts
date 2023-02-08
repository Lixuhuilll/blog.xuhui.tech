import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://blog.xuhui.tech",

  author: {
    name: "旭辉",
    url: "https://blog.xuhui.tech",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  // repo: "vuepress-theme-hope/vuepress-theme-hope",

  blog: {
    roundAvatar: true,
  },

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      // footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个正在学习的后端开发者",
        // intro: "/intro.html",
      },
      editLink: false,
    },
  },

  plugins: {
    blog: true,

    // 代码复制插件
    copyCode: {
      duration: 1000,
    },
    // If you don’t need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
