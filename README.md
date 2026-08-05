# 盘欣桐 · 个人作品集网站（XINTONG OS）

纯静态个人网站：首页是一个"赛博桌面"（XINTONG OS），包含关于我、作品集、经历、生活、联系等板块。

## 本文件夹

- `index.html` — 首页（桌面系统 + 开场动画）
- `about.html` / `projects.html` / `experience.html` / `life.html` / `contact.html` / `social.html` — 板块页
- `copy.html` / `push.html` / `newspaper.html` / `poster.html` / `red.html` / `video.html` — 作品集分类页
- `style.css` — 全站样式
- `assets/` — 图片、字体、JS 库

## 如何上线（GitHub Pages，免费）

1. 在 GitHub 新建一个仓库（如 `xintong-portfolio`）
2. 把本文件夹的**内容**（index.html 等，不含外层私人资料）上传到仓库
3. 仓库 **Settings → Pages** → Source 选 `main` 分支 / root → Save
4. 上线地址：`https://你的用户名.github.io/xintong-portfolio/`

## 上线后如何修改

改文件 → 提交推送到 GitHub → 线上约 1 分钟内自动更新。

## 注意事项

- 视频：大视频（超过 100MB）使用站外链接（抖音），GitHub 单文件上限 100MB
- 站内"编辑文字"功能默认关闭；如需在站内改字，把 `assets/edit.js` 里的 `ENABLED` 改为 `true`（上线时保持关闭）
- 简历 PDF 下载链接指向作品集文件夹里的《盘欣桐 个人简历作品集合.pdf》，上传时请把它复制到本站根目录
