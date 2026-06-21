# Jason 成长小宇宙

一个为 5–10 岁儿童与家长设计的移动优先学习网站。核心理念是：**孩子学知识，妈妈陪成长。**

## 功能

- 今日任务：数学、英文、阅读、脑力与生活混合练习
- 六大课程领域：数学、英文、阅读、脑力、生活、情绪
- 840 道年龄分级题目，支持两次作答、温柔提示与家长引导
- 晓芳妈妈故事屋：32 篇完整故事、8 个分类、收藏、阅读记录
- 冷笑话冰箱：80 个儿童安全笑话、8 个分类、每日推荐与笑点解释
- 自创笑话：孩子可以在本机编写、收藏并留下成长徽章
- 妈妈陪读与夜晚模式
- 阅读城堡：每个年龄 5 篇短文、词语、理解题与亲子讨论
- 英文乐园：单词卡、听音选词、跟读与英文故事入口
- 生活小镇：安全、自理、情绪、社交、金钱与责任
- 我的成长：星星、徽章、技能卡片与成长脚印
- 家长中心：学习报告、故事报告、弱项建议、PIN 与资料导入导出

## 技术与隐私

React、Vite 与原生 CSS。没有后端、数据库、账号、广告、追踪或外部 API。所有设置与学习记录仅保存在当前设备的 `localStorage`。浏览器语音使用设备内建 `speechSynthesis`，不支持时不影响其他功能。

家长入口默认数字口令为 `1234`。它只用于防止孩子误点设置，不是真实身份验证。

## 本地运行

需要 Node.js 18 或更高版本：

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

代码检查：

```bash
npm run lint
```

## GitHub Pages 部署

仓库包含 `.github/workflows/deploy.yml`。在 GitHub 仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。推送到 `main` 后会自动构建并发布。

## 内容维护

- 故事：`src/data/stories.js`
- 冷笑话：`src/data/jokes.js`
- 课程地图：`src/data/curriculum.js`
- 扩展题库：`src/data/questionBank.js`
- 阅读短文：`src/data/readingPassages.js`
- 英文内容：`src/data/vocabulary.js`
- 生活课程：`src/components/LifeClassroom.jsx`

## localStorage 数据

保存年龄、难度、每日时间、训练重点、星星、连续天数、徽章、故事与笑话阅读收藏、分类统计、自创笑话、答题记录、成长脚印和本机家长 PIN。家长可在家长中心导出或导入 JSON，也可以清除全部本机记录。

## 可继续升级

- 增加更多原创长篇故事与分龄插图
- 为课程技能增加逐项掌握状态
- 增加离线 PWA 支持
- 增加打印版亲子活动卡
