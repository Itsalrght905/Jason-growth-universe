# Jason 成长小宇宙

一个为 5–10 岁儿童设计的移动优先学习与脑力训练网站。界面为简体中文，内容温暖、轻松、适合手机和平板。所有学习设置与进度仅保存在当前设备。

## 主要功能

- 今日训练：根据年龄、难度、时长与训练重点混合出题
- 脑力游戏：记忆翻牌、顺序记忆、找规律、图形配对、注意力挑战
- 数学星球：按年龄动态生成选择题并讲解答案
- 英文乐园：年龄分级词汇/句子与浏览器语音朗读
- 阅读城堡与生活小课堂
- 星星、徽章、连续学习与完成庆祝
- 妈妈设置：年龄、训练时间、难度、重点及进度重置
- 60 道年龄分级样题（每年龄至少 10 道：2 道动态数学题及 8 道分类题）

## 技术栈

React、Vite、原生 CSS。没有后端、数据库、广告、分析工具或外部 API。英文发音使用浏览器自带 `speechSynthesis`，不支持时不影响其他功能。

## 本地运行

需要 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

根据终端提示打开本地地址。生产构建与预览：

```bash
npm run build
npm run preview
```

代码检查：`npm run lint`。

## 部署到 GitHub Pages

项目已包含 `.github/workflows/deploy.yml`。在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。推送到 `main` 后将自动构建并发布。Vite 使用相对资源路径，也可把 `dist/` 直接部署到 Vercel 或 Netlify。

## 修改年龄分级内容

- 综合题库：`src/data/questions.js`
- 英文内容：`src/data/vocabulary.js`
- 阅读内容：`src/data/reading.js`
- 生活课程：`src/data/lifeLessons.js`
- 动态数学生成器：`src/utils/questionGenerator.js`

每道题包含类型、图标、题目、选项、正确答案和解释，按现有格式继续添加即可。

## 本地数据与妈妈密码

应用仅通过 `localStorage` 在当前浏览器保存：`selectedAge`、`difficulty`、`sessionLength`、`trainingFocus`、`totalStars`、`dailyStreak`、`completedSessions`、`lastCompletedDate` 和 `badges`。数据不会发送到任何地方。

“妈妈设置”的默认密码是 `1234`。它只是帮助孩子和家长区分页面的本地便捷功能，不是真实身份验证或安全机制。

## 隐私与安全

没有后端、数据库、账号、追踪、广告、聊天、上传、定位或儿童数据收集。清除浏览器数据或使用“重置学习进度”会删除本机进度。

## 未来可改进

- 增加更多题目与故事
- 增加可选的语音提示与打印练习
- 增加更多完整互动脑力关卡
- 支持家长导出/导入匿名本机进度
