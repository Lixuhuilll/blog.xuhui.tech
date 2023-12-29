# 获取git历史，大部分CI服务默认只会clone最近的一次提交
# 这会导致git相关的插件无法正常工作
git fetch --unshallow
# 构建
pnpm run docs:build
