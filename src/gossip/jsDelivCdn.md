---
date: 2023-2-10 19:00:00 +0800
tag:
  - VuePress
  - Web
  - jsDeliv
---

# 借助jsDeliv CDN，在Github上部署图床

目前我的站点是借助Cloudflare Pages部署的纯静态网站，而它有一个限制，每个站点的空间占用默认最多为25MB，这点空间显然不能满足今后网站显示图片的需求，需要有一个专门的大空间储存图片等资源，这就需要图床。

网络上的图床方案非常多，jsDeliv + Github对我来说应该是最简便的了。简单来说jsDeliv会自动收录所有Github上的开源仓库，将它们部署到CDN，只需要通过 `https://cdn.jsdelivr.net/gh/<GitHub用户名>/<GitHub仓库名>/` 便可访问到仓库根目录(*注意不要忽略结尾的 /* )。

以本项目为例，项目根目录就是[https://cdn.jsdelivr.net/gh/lixuhuilll/blog.xuhui.tech/](https://cdn.jsdelivr.net/gh/lixuhuilll/blog.xuhui.tech/ "本项目在jsDeliv中的GitHub根")，如果我需要插入项目目录下的/static/image/p1.png，则图片地址为`https://cdn.jsdelivr.net/gh/lixuhuilll/blog.xuhui.tech/static/image/p1.png`

在markdown中，插入图片只需要 `![<描述图片的关键词，可以不写>](<图片URL>)`即可，以p1.png为例，则是 `![一张图片](https://cdn.jsdelivr.net/gh/lixuhuilll/blog.xuhui.tech/static/image/p1.png)`:

![一张图片](https://cdn.jsdelivr.net/gh/lixuhuilll/blog.xuhui.tech/static/image/p1.png "本站的Ping图")
