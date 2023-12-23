---
date: 2023-2-12T1:00:00+8
tag:
  - web
  - cloudflare
---
# 吐槽一下

昨天搞完jsDeliv，今天就发现jsDeliv官方已经限制了图床这一用途，图片资源全部直连GitHub而不再缓存。cloud flare是有提供免费的*对象存储服务(OSS)*，但奈何需要把域名的dns迁移到cloud flare，否则就无法使用自定义域名，官方的一长串域名不好用也不安全，因此我之前才不想使用，因为我的域名挂靠在万网，不想搞过来，但现在确实没办法。目前本站dns已经迁移到cloud flare，R2对象存储也配置好了，顺便配置了显式URL转发，通过[xuhui.tech](//xuhui.tech)也可访问本站。

随便来张表情包：

![高爆狗](https://oss.xuhui.tech/image/%E9%AB%98%E7%88%86%E7%8B%97.jpeg)
