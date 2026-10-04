# 交接文档（HANDOFF）— 生活物种（林粒粒 AI 编程第三周 · SBTI · COZE 提示词项目）

> 本文件依据规范模板 v2.3 的 `docs/handoff/HANDOFF.md` 生成；由 neat-freak 整理动作产出（2026-08-18）。

## 1. 项目概述
- 项目交付物：一份给「扣子（COZE）编程」的**最终开发提示词 v1.3**，用于完成一个带 Supabase 后端数据库的移动端优先 Web 网站（24 道测试 → 18 隐藏维度 → 24 物种 → 主物种 + 2 副物种）。
- 已 DONE（见文件夹命名 `DONE丨20260811`）。本项目以**提示词 + 素材交付包**为主，同时含一份完整可运行的 Next.js 16 + Supabase 实现（`src/`）。

## 2. 当前状态
- 主需求 / 开发规范：`docs/pm/life_species_coze_prompt_v1_3_FINAL.md`（原根目录文件，按规范归入 `docs/pm/`，保留原名）。
- 24 张正式角色 PNG 与 3 个拆分 ZIP 为交付素材，均保留。
- 在线站点：https://p002-life-species-test.vercel.app （Vercel 项目 `houfan/p002-life-species-test`，接 GitHub `wanghoufan/p002-life-species-test`，push main 即构建）。原扣子托管预览站已停用。
- **未闭环**：站点运行环境没有任何 Supabase 凭据（Vercel 环境变量 0 个），所以 `/api/runs/*`、`/api/results/*`、`/api/stats` 仍返回 500。前端已补「演示模式」兜住主流程（见 §9）：答题、出结果、生成分享长图都能用；**仍然不可用的是物种分布图鉴，以及别人打开你的结果链接**。详见 §8、§9。

## 3. 技术栈 / Source of Truth（来自提示词）
- 目标架构：Supabase / PostgreSQL 后端 + 移动端优先 Web；前端页面 `/`、`/test`、`/r/{share_code}`。
- 唯一正式评分事实源：`life_species_calibrated_scorer_v1.mjs`（生产只允许此 scorer）。
- 唯一正式图片映射依据：`life_species_supabase_seed_manifest_v1.json`。
- 24 张正式 PNG 命名与 `species_key` 固定绑定，**禁止重命名 / 翻译 / 改扩展名**。
- `manifest.csv` 不上传、不部署、不作为映射依据。

## 4. 文档地图（规范 v2.3）
| 文件 | 内容 |
|---|---|
| `docs/pm/PLAN.md` | 项目计划（首版，2026-10-04 与 README 对齐） |
| `docs/pm/life_species_coze_prompt_v1_3_FINAL.md` | 主需求 / 开发规范（COZE 提示词 v1.3） |
| `docs/qa/QA_CHECKLIST.md` | 回归清单（说明暂无历史基线） |
| `docs/qa/BUGS.md` | 缺陷跟踪（首版） |
| `docs/review/CODE_REVIEW.md` | 代码审查（首版） |
| `docs/review/PRODUCT_BACKLOG.md` | 产品优化 backlog（首版） |
| `docs/handoff/HANDOFF.md` | 本文件 |
| `docs/roles/*.md` | 角色规范（builder / planner / qa / code-reviewer / product-reviewer / supervisor / task-manager / neat-freak / db-admin 等） |
| `docs/sop/*.md` | 操作规程（supabase、webqa、android、docker、sqlite、decision-router 等） |
| `README.md` / `README.en.md` | 对外入口（中 / 英），含快速开始、环境变量、接口与限制 |
| `scratch/species_assets_v1 - 副本/` | 物种图冗余副本（26 张，疑似 `species_assets_v1` 的重复，已移入 scratch 保留不删） |
| `scratch/` | 临时 / 冗余 / 备份 |

## 5. 本次整理记录（2026-08-18）
- `life_species_coze_prompt_v1_3_FINAL.md` → `docs/pm/`（保留原名，按规范归位）。
- `species_assets_v1 - 副本`（26 张图，疑似冗余副本）→ `scratch/`（保留不删）。
- 新建全套规范骨架。
- 交付素材不动：`species_assets_v1/`（含 part1/2/3 解压目录）、`species_assets_v1_part1/2/3.zip`。

## 6. 已知事项 / 下一步
- 实施时须将 3 个 ZIP 解压后合并为**同一个** `public/assets/species/`（24 张 PNG），禁止生成 part1/2/3 子目录（`manifest.csv` 不上传）。
- 评分模块须通过自动测试 `node life_species_calibrated_scorer_test_v1.mjs`：24/24 fixture 命中、deterministic=true、crossFamilySecondary=true、status=PASS。
- 高权限信息（Supabase `service_role`、`DATABASE_URL`）只允许服务端环境变量，严禁进入前端 bundle。
- `docs/pm/PLAN.md`、`docs/qa/QA_CHECKLIST.md` 等建议后续补充。

## 7. neat-freak 收尾记录（2026-08-18）

- 一致性核查：主需求/开发规范位于 `docs/pm/life_species_coze_prompt_v1_3_FINAL.md`（已归位）；交付素材 `species_assets_v1/`（3 part 解压目录）、`species_assets_v1_part1/2/3.zip` 均在。
- 文档-代码差异：本项目为 **COZE 提示词交付包**，无代码仓库、无运行态；故无传统 `AGENTS.md` 结构。已新建 `AGENTS.md` 说明项目性质与 Source of Truth。（该条为 2026-08-18 当时状态，现已不成立，见 §8。）
- 文档地图：规范骨架齐备；因无 design-qa 报告，`QA_CHECKLIST.md` 等暂无历史回归基线，建议后续按提示词「十二、最终 P0 验收」清单建立。
- scratch/：`species_assets_v1 - 副本/`（24 图 + manifest.csv + 一个 part zip，疑似冗余副本，已移入 scratch 保留不删；注意 manifest.csv 按提示词不得部署）。
- 无重复 / 过时 / 互相冲突的项目管理 Markdown。

## 8. 洁癖收尾记录（2026-10-04）

- **迁移**：扣子托管预览站因账户欠费停用，同一份代码改由 Vercel 部署（`houfan/p002-life-species-test`，生产别名 `p002-life-species-test.vercel.app`）。Vercel 侧已自动接上 GitHub 仓库，push `main` 即触发生产构建（实测 READY）。
- **文档对齐**：README 重写为「可运行站点入口」并新增英文版；`PLAN.md`、`AGENTS.md`、本文件里「非完整代码仓库 / 无运行态 / 预览地址为 coze.site」的过期说法已按现状更正。
- **仓库卫生**：`.gitignore` 补 `node_modules/`、`.next/`、`dist/`、`tsconfig.tsbuildinfo`，备份忽略规则放宽为 `*.旧版-*`；新增 `vercel.json`（构建命令固定 `next build`）与 `.vercelignore`（排除根目录素材存档副本，保留 `public/assets/`）。
- **治理三件套**：AGENTS.md 的 ORCA 区块同步到母版 `2026-10-03-汇报与自决`，`GOVERNANCE-STATE.json` 的 `rules_version` / `synced_at` 同步，`docs/roles/{supervisor,task-manager}.md` 补汇报抽查与自决口径；账本校验 `node scripts/model/check-ledger.mjs docs/model` → `LEDGER-OK`（含 WARN，两本账仍为空账本，首个真实派工前正常）；本节即三件套第 ③ 条的 HANDOFF 记行。
- **实测基线**（本机 Node 24.19 / pnpm）：`pnpm install`、`pnpm dev`（5000 端口，`/` 与 `/test` 均 200）、`pnpm build`、`pnpm ts-check` 通过；`node life_species_calibrated_scorer_test_v1.mjs` → 24/24、deterministic、crossFamilySecondary、inputValidation、`Status: PASS`。
- **残留与待决（不卡本次目标，登记备查）**：
  - 后端未闭环：Vercel 无 Supabase 凭据 → 图鉴接口 500、结果无永久链接（主流程已由 §9 的演示模式兜住）。需要新建 Supabase 项目 + 5 张表（`test_runs`、`test_answers`、`result_snapshot`、`species_content`、`feedback`）+ 24 条种子数据，再配三个环境变量；仓库内无建表 SQL，需按提示词 v1.3 自行编写。
  - 结果页「给结果打分」四档按钮只设前端状态，未调用 `/api/runs/{runId}/feedback`，评分不入库（接口本身已实现）。
  - `docs/model/GOVERNANCE-STATE.json` 的 `product_acceptance_ac_added` 仍为未完成态：实绩 Plan 缺「视觉与交互验收标准（AC 编号）＋关键 AC 集合＋发布类型」，按 AGENTS 属「存量项目待办，不自动做」，需项目 TM 判断。
  - `ing 丨 0825 workbuddy探索/`（约 14MB、721 个文件）是与本项目无关的外部探索素材，未入库也未忽略，处置权在用户。

## 9. 多语言上线（2026-10-04）

- 站点支持中文 / English：默认跟随浏览器语言（`zh*` → 中文，其余 → 英文），右上角可手动切换，选择记在 `localStorage.life_species_locale`，并同步 `<html lang>`。
- 实现集中在 `src/i18n/`：`locale.tsx`、`ui.ts`、`questions.ts`（中英题库，选项顺序与中文严格一一对应）、`species-en.ts`（24 条物种英文文案，按 `species_key` 覆盖，未命中回落中文）、`LanguageToggle.tsx`。
- **不碰事实源**：`life_species_calibrated_scorer_v1.mjs`、`life_species_supabase_seed_manifest_v1.json`、24 张 PNG 文件名与 `species_key` 均未改动；同一份答案两种语言得到同一物种。
- 实测：`pnpm ts-check` 与 `next build` 通过；eslint 错误数与改动前基线一致（40，均为既有 `no-explicit-any`）；浏览器实测中/EN 双向切换、题目与选项、进度点提示、结果页错误态、图鉴文案均为对应语言，388px 窄屏无溢出与重叠；脚本核对 manifest 24 键与英文文案 24 条完全对齐、选项数一致、`zh` 分支原样透传。
- 结果页物种文案的英文路径**未经线上运行验证**（数据库仍未接），只做了函数级验证。
- 同日补「演示模式」通道（`POST /api/runs/preview` + `src/lib/preview-result.ts`）：数据库不可用时答题页自动回退，用正式评分器当场出结果、结果页可看可出分享长图，但不落库、无永久链接、关标签页即失。浏览器实测：`/api/runs/start` 500 → 自动跳 `/r/preview`，英文结果页主物种 Life Documentary、副物种 Dopamine Beast / Food Hunter、三张物种 PNG 全部加载、388px 零溢出、复制链接按钮按预期隐藏。分享长图已用 headless Chromium（CDP）跑通：提交后自动跳 `/r/preview`，点「Create a share image」0.5 秒出图，尺寸 750×2592、约 0.38 MB PNG，图内全英文、三张物种 PNG 正常渲染、演示模式提示不在截图区内。（此前在 in-app 浏览器里卡住是该标签 `visibilityState=hidden` 被限流所致，非代码问题。）

