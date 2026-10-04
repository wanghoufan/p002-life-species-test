# 生活物种

> 24 道题测出你的「生活物种」：一个移动端优先的人格测试网站。仓库里同时放着把它交给 AI 编程平台实现时所用的**最终开发提示词 v1.3** 和全套素材。

简体中文 | [English](./README.en.md)

**在线地址**：https://p002-life-species-test.vercel.app

整条流程现在就能走完（答题 → 出结果 → 存分享长图），未配数据库时走[演示模式](#演示模式无需数据库)；只有物种分布图鉴和「给别人打开的永久链接」需要后端数据库，见[环境变量](#环境变量)。

![首页预览](./assets/homepage-preview.png)

---

## 这是什么

「生活物种」是一个动物卡通人格宇宙：答完 24 道生活场景题，系统按固定算法算出你的 **1 个主物种 + 2 个副物种**，并生成一条永久有效的分享链接。

本仓库有两重身份：

1. **可运行的网站**：Next.js 16 + Supabase 的完整实现（`src/`），本地一条命令即可启动。
2. **交付提示词包**：`docs/pm/life_species_coze_prompt_v1_3_FINAL.md` 是给「扣子（COZE）编程」的最终开发提示词，规定了题目、维度、评分算法、数据库结构和视觉方向，是唯一权威需求来源。

适合谁：想直接玩这个测试的人；想照着提示词重做一套实现的人；需要一份「提示词 → 可运行 Web 产品」完整落地样本的人。

## 你能做什么

- **答完 24 道题**：一屏一题，约 3–5 分钟，可回改，进度点显示在顶部。
- **拿到确定的结果**：24 个物种、18 个隐藏维度，评分由 `life_species_calibrated_scorer_v1.mjs` 算出——同一份答案永远得到同一个结果，不由大模型临场生成。
- **分享永久链接**：结果页地址形如 `/r/{share_code}`，任何人打开都看到同一份结果。
- **存成图片**：结果页可生成分享卡片并「保存到相册」。
- **给结果打分**：结果页有四档反馈（完全不像 → 太准了）；注意目前只有界面选择，`POST /api/runs/{runId}/feedback` 接口已实现但前端尚未调用，评分不会入库。
- **看总体分布**：首页的「物种分布图鉴」弹窗展示所有人的物种占比。
- **中英切换**：页面右上角「中文 / English」，默认跟随系统语言，选过一次后记住选择。详见[多语言](#多语言)。
- **没接数据库也能看到结果**：提交时若数据库不可用，会自动改走本机通道——用同一个正式评分器当场算出主物种与副物种，结果页照常展示、照常能生成分享长图，只是不落库、关掉标签页就没了、也没有永久链接。结果页顶部会显示「演示模式」提示。详见[演示模式](#演示模式无需数据库)。

## 快速开始

前置条件：Node.js 24（本仓库 `.coze` 声明的版本，实测 Node 24.19 可跑）与 pnpm ≥ 9（`preinstall` 钩子会拒绝 npm）。

```bash
pnpm install
pnpm dev
```

打开 http://localhost:5000 。不配数据库也能整条走完：首页、24 题、出结果、生成分享长图都正常（走[演示模式](#演示模式无需数据库)），只有「物种分布图鉴」打不开。要拿到可分享给他人的永久链接和图鉴，先按下一节配好 Supabase。

生产模式启动：

```bash
pnpm build
COZE_PROJECT_ENV=PROD pnpm start   # 同样监听 5000 端口
```

## 多语言

- **默认跟随系统语言**：浏览器语言以 `zh` 开头显示中文，其余显示英文。
- **手动切换**：页面右上角「中文 / English」。选择写入 `localStorage` 的 `life_species_locale`，跨页面记住，同时把 `<html lang>` 同步为 `zh-CN` / `en`。
- **覆盖范围**：首页、24 道题目与全部选项、答题页按钮与报错提示、结果页各栏位标题与分享文案、物种分布图鉴。
- **实现位置**：`src/i18n/` —— `locale.tsx`（语言状态与检测）、`ui.ts`（界面文案）、`questions.ts`（中英题库）、`species-en.ts`（24 条物种英文文案）、`LanguageToggle.tsx`（切换控件）。
- **物种英文是展示层覆盖**：数据库 `species_content` 仍只存中文正式文案，英文按 `species_key` 从 `species-en.ts` 取，未收录的 key 自动回落中文。图片文件名、`species_key` 与评分算法与语言无关——同一份答案在中英文下得到同一个物种。

## 演示模式（无需数据库）

`POST /api/runs/preview` 是一条不碰数据库的通道，实现只有两个文件：`src/app/api/runs/preview/route.ts` 和 `src/lib/preview-result.ts`。

- 评分仍然调用正式评分器 `life_species_calibrated_scorer_v1.mjs`，没有任何第二套算法；物种文案取自正式映射文件 `life_species_supabase_seed_manifest_v1.json`，图片路径与 `species_key` 都是正式值。
- 答题页先按正常流程调 `/api/runs/start` + `/api/runs/{runId}/complete`；只有这条链路报错时才回退到 preview，并把结果暂存到 `sessionStorage.life_species_preview`，然后跳 `/r/preview`。
- 因此演示模式下结果页能看、能存分享长图，但**没有永久链接**（页面会隐藏「复制结果链接」并显示演示模式提示），关掉标签页结果就没了。
- 数据库配好之后这条回退不会再触发：正常链路成功就直接走 `/r/{share_code}`。

## 环境变量

三个变量都是 **Supabase 项目的凭据**，只放在服务端环境（`.env.local` 或 Vercel 的 Environment Variables），不要写进前端代码。

| 变量 | 作用 | 从哪拿 |
|---|---|---|
| `COZE_SUPABASE_URL` | Supabase 项目地址 | Supabase 控制台 → Project Settings → API |
| `COZE_SUPABASE_ANON_KEY` | 匿名访问密钥 | 同上 |
| `COZE_SUPABASE_SERVICE_ROLE_KEY` | 服务端写入用的高权限密钥 | 同上，**严禁进入前端 bundle** |

变量名前缀 `COZE_` 是历史原因：这套键名沿用扣子平台自动注入的变量名，本地和 Vercel 上用同名即可，`src/storage/database/supabase-client.ts` 会按这三个名字读取。

`COZE_PROJECT_ENV=PROD` 只影响 `src/server.ts` 的启动模式，不设置即以开发模式运行。

## 页面与接口

| 路径 | 作用 | 是否需要数据库 |
|---|---|---|
| `/` | 首页 | 否（图鉴弹窗除外） |
| `/test` | 24 题答题 | 提交时需要 |
| `/r/{share_code}` | 永久结果页 | 是 |
| `POST /api/runs/preview` | 本机算结果，不写库（数据库未接入时的回退通道） | 否 |
| `POST /api/runs/start` | 开一轮测试，返回 `runId` | 是 |
| `POST /api/runs/{runId}/complete` | 提交答案并落库、生成分享码 | 是 |
| `POST /api/runs/{runId}/feedback` | 保存用户对结果的打分 | 是 |
| `GET /api/results/{shareCode}` | 按分享码读结果 | 是 |
| `GET /api/stats` | 物种分布统计 | 是 |

## 数据库

运行时需要 5 张表：`test_runs`、`test_answers`、`result_snapshot`、`species_content`、`feedback`。

- 建表 SQL、RLS 策略与 Seed 流程**不在本仓库里**——它们属于提示词 v1.3 要求实现方完成的部分，见 `docs/pm/life_species_coze_prompt_v1_3_FINAL.md` 的数据库与验收章节。
- 24 条物种文案与图片路径的正式事实源是 `life_species_supabase_seed_manifest_v1.json`（`schemaVersion 1.0` / `testVersion mvp-1.2` / `scorerVersion mvp-1.2-calibrated`），字段与 `species_content` 一一对应。
- 图片以文件形式放在 `public/assets/species/`，数据库只存路径（如 `/assets/species/01_weekend-dog.png`），不存二进制。

## 自检命令

```bash
node life_species_calibrated_scorer_test_v1.mjs   # 期望：24/24 命中、Overall PASS、Status PASS
pnpm ts-check                                     # TypeScript 类型检查
pnpm validate                                     # tsc + eslint + stylelint 并行
pnpm build                                        # next build + tsup 打包 src/server.ts
```

## 部署

- **Vercel**（当前在线站点）：`vercel.json` 把构建命令固定为 `next build`；`.vercelignore` 只排除仓库里的素材存档副本目录，`public/assets/species/` 的 24 张 PNG 正常随部署上传。
- **扣子（COZE）**：原预览站已停用。仓库保留 `.coze` 配置与 `scripts/*.sh`，若重新启用扣子托管仍可按原流程构建。

## 实施约束

给 AI 编程平台或二次开发者的硬规则，完整版本以提示词 v1.3 为准：

1. 正式评分只能用 `life_species_calibrated_scorer_v1.mjs`（版本 `mvp-1.2-calibrated`），前端不得另写一套评分逻辑。
2. 24 道题、18 个维度、24 个 `species_key`、主物种 + 2 个跨 family 副物种的规则不得重新设计。
3. 24 张 PNG 的文件名与 `species_key` 固定绑定，禁止重命名、翻译或改扩展名；`manifest.csv` 不上传、不部署、不作为映射依据。
4. 高权限凭据（`service_role`、`DATABASE_URL`）只允许服务端环境变量。
5. 同一份答案 + 同一测试版本 + 同一评分器版本必须永远得到相同结果。
6. MVP 明确不做：登录注册、朋友互评、双人匹配、排行榜、社区、私信、AI 聊天。

## 仓库内容

| 路径 | 说明 |
|---|---|
| `src/` | Next.js 16 App Router 实现：页面、接口、Supabase 客户端 |
| `public/assets/species/` | 24 张正式角色 PNG，部署时直出 |
| `docs/pm/life_species_coze_prompt_v1_3_FINAL.md` | **主需求 / 开发规范（唯一权威）** |
| `life_species_calibrated_scorer_v1.mjs` | 正式评分器 |
| `life_species_calibrated_scorer_test_v1.mjs` | 评分器自动测试 |
| `life_species_supabase_seed_manifest_v1.json` | 正式图片与文案映射（24 条） |
| `species_assets_v1/`、`species_assets/` | 素材存档副本（与 `public/assets/species/` 内容相同，不随部署上传） |
| `docs/pm/PLAN.md` | 项目计划 |
| `docs/handoff/HANDOFF.md` | 交接文档 |
| `docs/qa/`、`docs/review/` | 回归清单、缺陷跟踪、代码审查、产品 backlog |
| `docs/roles/` | 协作角色规范 |
| `AGENTS.md` | 项目结构事实与协作约定（面向 AI 协作者） |
| `scripts/` | 扣子平台的 build / dev / start / validate 脚本 |

## 目录结构

```
.
├── src/
│   ├── app/                 # 页面与 API 接口
│   ├── components/          # 业务组件（图鉴弹窗等）
│   ├── storage/database/    # Supabase 客户端与凭据读取
│   └── server.ts            # 自定义 HTTP 服务（扣子托管用）
├── public/assets/species/   # 24 张正式 PNG
├── docs/                    # 需求、计划、QA、审查、角色规范
├── scripts/                 # 构建与启动脚本
└── life_species_*.mjs / *.json   # 评分器、测试、种子映射（事实源）
```

## 已知限制

- 仓库不含建表 SQL 与迁移文件，数据库需自行按提示词建立。
- 中文物种文案在数据库、英文在 `src/i18n/species-en.ts`，两处需人工同步；新增或改写物种时要同时更新。
- 24 张 PNG 合计约 38 MB，全部作为静态资源直出，未做压缩或响应式尺寸。
- 公开仓库，未附带开源 License——别人可以看，但不构成授权复用。
- 依赖扣子平台的运行时（`coze-coding-dev-sdk` 的上报包装、`coze_workload_identity` 取密钥）在非扣子环境下会自动跳过，凭据需按上面的环境变量自行提供。

## 详细文档

- [主需求 / 开发规范 v1.3](./docs/pm/life_species_coze_prompt_v1_3_FINAL.md)
- [项目计划](./docs/pm/PLAN.md) · [交接文档](./docs/handoff/HANDOFF.md)
- [代码审查](./docs/review/CODE_REVIEW.md) · [产品 backlog](./docs/review/PRODUCT_BACKLOG.md) · [回归清单](./docs/qa/QA_CHECKLIST.md) · [缺陷跟踪](./docs/qa/BUGS.md)
- [协作约定 AGENTS.md](./AGENTS.md)
