# blog.xuhui.tech

我的个人主页

## 项目结构介绍

`public/` 为第三方文件目录，主要包括那些不影响站点运行，但是必须部署在根目录的文件，例如搜索引擎的验证文件。

`src/` 为源文件目录，包括所有的源文件，例如文章、页面、VuePress配置文件、图片等。

    其中`src/.vuepress/navbar/`、`src/.vuepress/sidebar/`、`src/.vuepress/styles/`、`src/.vuepress/config.ts`、`src/.vuepress/theme.ts` 均为配置文件，`src/.vuepress/public/` 内则是网站的静态资源文件，例如网站的logo。

`build.sh` 为构建脚本，用于构建项目，只需要配置CI的构建命令为 `bash build.sh`即可。
