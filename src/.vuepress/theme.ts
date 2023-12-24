import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from "./navbar";
import {zhSidebar} from "./sidebar";

export default hopeTheme({
  hostname: "https://blog.xuhui.tech",

  author: {
    name: "旭辉",
    url: "https://blog.xuhui.tech",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "Lixuhuilll/blog.xuhui.tech",

  blog: {
    roundAvatar: true,
  },

  sidebarSorter: ["readme", "order", "date-desc", "title", "filename"],

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      // footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "一个正在学习前端的后端开发者",
        timeline: "时间轴",
        // intro: "/intro.html",
      },
      blogLocales: {
        gossip: "杂谈",
      },
      editLink: false,
      contributors: false,
    },
  },

  plugins: {
    blog: {
      // 修改自动摘要的长度
      excerptLength: 100
    },

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
      repo: "Lixuhuilll/blog.xuhui.tech",
      repoId: "R_kgDOI66gQw",
      category: "Announcements",
      categoryId: "DIC_kwDOI66gQ84CUFLE",
    },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: false,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: false,
      mark: true,
      mermaid: false,
      playground: {
        presets: ["ts", "vue"],
      },
      revealJs: false,
      /*{
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },*/
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: false,
    },
  },
});
