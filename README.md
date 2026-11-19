# pxlian.github.io

Xianglian Peng 的个人主页 · Personal homepage — https://pxlian.github.io

联系方式：xlpeng@stu.ouc.edu.cn

## 结构

```
index.html            页面内容
assets/css/style.css  样式（浅色 / 深色主题）
assets/js/main.js     中英切换、主题切换、滚动动画
assets/favicon.svg    站点图标
.nojekyll             关闭 Jekyll 处理，加快构建
```

纯静态页面，无构建步骤、无外部依赖。

## 本地预览

直接双击 `index.html`，或启动一个本地服务器：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库，仓库名必须为 `pxlian.github.io`。
2. 推送本目录内容到 `main` 分支：

   ```bash
   git init
   git add .
   git commit -m "Add personal homepage"
   git branch -M main
   git remote add origin git@github.com:pxlian/pxlian.github.io.git
   git push -u origin main
   ```

3. 仓库 **Settings → Pages → Build and deployment**，Source 选择
   **Deploy from a branch**，Branch 选择 `main` / `(root)`，保存。
4. 等待约 1 分钟，访问 https://pxlian.github.io 。

## 修改内容

- 文字：`index.html` 中带 `data-i18n` 属性的节点为中文原文；英文翻译在
  `assets/js/main.js` 顶部的 `EN` 对象中，按相同的 key 修改。
- 颜色：`assets/css/style.css` 顶部的 `:root` 变量（`--accent` 为主色）。
- 邮箱：`xlpeng@stu.ouc.edu.cn`，在 `index.html` 中搜索 `mailto:` 即可修改。
