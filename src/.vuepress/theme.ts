import { hopeTheme } from "vuepress-theme-hope";
import { compareDate } from "vuepress-shared";
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

  repo: "Lixuhuilll/blog.xuhui.tech",

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
      excerptLength: 100,
      type: [
        {
          key: "gossip",
          path: "/gossip/",
          // 判断是否是该分类，顺便做一些加工
          filter: (page) => {
            if (!page.path.startsWith("/gossip/"))
              return false;
            else {
              // 如果没有设置图标，则使用默认图标
              if (!page.frontmatter.icon) {
                page.frontmatter.icon = "note";
              }
              // 不显示面包屑
              page.frontmatter.breadcrumb = false;
              // 以时间作为侧边栏自动排序依据
              if (page.frontmatter.date && page.frontmatter.order === undefined) {
                // 获取明天的时间值为标准，彻底解决时区问题导致order出现负数的问题
                const tomorrowTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                // 计算标准时间值和page时间值的差值
                const diff = tomorrowTime - new Date(page.frontmatter.date).getTime();
                page.frontmatter.order = diff;
              }
              return true;
            }
          },
          // 按照时间排序
          sorter: (a, b) => {
            return compareDate(a.frontmatter.date, b.frontmatter.date);
          },
        },
      ],
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
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
