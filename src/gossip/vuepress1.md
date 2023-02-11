---
date: 2022-2-10
tag: 
  - VuePress
  - Web
---

# VuePress自动生成侧边栏的排序问题 
  
 　　我希望不同的页面使用的侧边栏生成规则不同，我的主题提供了sidebarSorter配置，但它的设置全局通用，无法区分，于是我整了波骚操作，直接在过滤器里写自定义的代码 8-) 
  
 ```typescript 
 blog: { 
       type: [ 
         { 
           key: "gossip", 
           path: "/gossip/", 
           // 判断是否是该分类，顺便做一些加工 
           filter: (page) => { 
             if (!page.path.startsWith("/gossip/")) 
               return false; 
             else { 
               // 如果没有设置图标，则使用默认图标 
               if (!page.frontmatter.icon) { 
                 page.frontmatter.icon = "note"; 
               } 
               // 不显示面包屑 
               page.frontmatter.breadcrumb = false; 
               // 以时间作为侧边栏自动排序依据 
               if (page.date && page.frontmatter.order === undefined) { 
                 // 计算日期和当前日期的差值 
                 const diff = new Date().getTime() - new Date(page.date).getTime(); 
                 page.frontmatter.order = diff; 
               } 
               return true; 
             } 
           }, 
           // 文章列表按照时间排序 
           sorter: (a, b) => { 
             return compareDate(a.date, b.date); 
           }, 
         }, 
       ], 
     }, 
 ```
