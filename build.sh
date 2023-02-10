# 获取git历史
git fetch --unshallow
# 构建
npm run docs:build
# 复制360搜索站点验证文件
mv public/991d9149430c83a7c3ffd556d806d0ee.txt \
    src/.vuepress/dist/991d9149430c83a7c3ffd556d806d0ee.txt