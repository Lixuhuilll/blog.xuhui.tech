# 获取git历史，大部分CI服务默认只会clone最近的一次提交
# 这会导致git相关的插件无法正常工作
git fetch --unshallow
# 构建
pnpm run docs:build
# 复制第三方文件,这个文件夹用于放置与网站本身工作无关,但是需要被部署的文件
# 例如搜索引擎的所有权验证文件
mv -u public/* src/.vuepress/dist/
