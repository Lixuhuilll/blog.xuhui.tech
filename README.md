# blog.xuhui.tech

我的个人主页

## 项目结构介绍

`src/` 为源文件目录，包括所有的源文件，例如文章、页面、VuePress配置文件、图片等。

>其中`src/.vuepress/navbar/`、`src/.vuepress/sidebar/`、`src/.vuepress/styles/`、`src/.vuepress/config.ts`、`src/.vuepress/theme.ts` 均为配置文件，`src/.vuepress/public/` 内则是网站的静态资源文件，例如网站的logo，除此之外，其他文件均为文章或页面。

`static/`与`src/.vuepress/public/` 功能类似，但`src/.vuepress/public/`会被打包到`dist/`目录下，成为站点，而`static/`不会被打包，主要是用于规避站点大小的限制，直接通过仓库链接读取图片等静态资源。

`build.sh` 为构建脚本，用于构建项目，只需要配置CI的构建命令为 `bash build.sh`即可。
