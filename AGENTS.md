# AGENTS — 生活物种（COZE 提示词交付包）

<!-- ORCA-RULES-BLOCK:BEGIN -->
<!-- 本区块由治理母版 scripts/sync-old-projects.sh 于 2026-10-03 注入；只增不删，可重复运行原地更新。 -->
<!-- 本项目 AGENTS.md 的其余内容（项目专属规矩）保持原样，冲突时以本区块为准。 -->
## ORCA 规则增量（母版 2026-10-03-汇报与自决）

> 本区块只写**对外通用**的机制增量；派工细节见 `docs/roles/`，账本口径见下方条目。

- **产品验收（2026-09-28 定）**：开发完成的判断来自**用户可见要求的覆盖证据**，不只看单测／构建／代码审查／工具调用成功。
  - 验收标准写在计划里：Phase1 给每条用户可见要求编一条可观察可测的**验收条目（AC）**，并标出**关键 AC**（对应 P0／blocking P1／核心用户路径／必要视觉交互呈现）；**关键 AC 集合不得为空**。
  - 证据落 `docs/qa/` 的**产品验收追踪矩阵**（照 `docs/qa/BUGS.template.md` 同名节）。
  - **不可放行三情形**（命中任一不得判 `PASS`）：①关键产品 DoD／AC 未测；②关键任务涉及的**每个**可见操作控件未实际点击并观察到页面／锚点／状态变化（只验 `href` 存在不算）；③验收证据缺失。
  - 视觉验收最小覆盖：关键用户任务逐条走通、按项目要求检查桌面与窄屏、用边界样本（奇偶条目数／长标题长正文／空状态）检验对齐·换行·裁切·溢出·可读性、留真实浏览器截图。
  - **用户签收**：发布类型为**首次发布**的，用户签收通过才算完成（签收前状态记未完成）；迭代更新与局部修复不强制签收。签收属 **Human Gate 范畴（用户参与）**，**不是新增 QA Gate**。
- **体系更新三件套（2026-09-29 定）**：①本项目规则文件改动后与母版对齐（用 `bash scripts/sync-old-projects.sh` 或按《迁移整理提示词》取包，**备份不覆盖**）；②账本内容**不重写**（实绩历史），只做 schema 校验 `node scripts/model/check-ledger.mjs docs/model`（须 `LEDGER-OK`）；③**HANDOFF 记一行**。**老项目无两包概念，故母版的「同步两包＋更新对外概览」不适用。**
- **派工跨目录禁令（2026-09-29 定）**：派 opencode 通道角色（supervisor／neat-freak／experience-recorder）时，任务里读写本仓以外目录（如 `/tmp`、`1.Active/` 等）会被 `external_directory` 权限自动拒、步骤静默失败，可能让角色误报已做也易反复盲试烧额度（禁盲试）；派单前处置二选一——①临时文件改到仓内已 gitignore 的 `temp/`，②先取得用户授权；codebuddy／codex 通道无此限制。
- **汇报与自决（2026-10-03 定）**：本项目 TM（编排者）**只报三件事**——① 目标完成没（计划内 AC 是否全部有证据）；② 用户安排的工作完成没（派工是否交付、发布上线是否已验证生效）；③ 大影响（功能上线/回滚、线上故障、数据或备份丢失、生产或他人项目被改动、需用户本人操作的账号授权/解密、任何不可逆删除）。
  - **默认自决自做、不问不报**（可逆、只在本项目内、不碰业务）：已合并本地分支删除、未跟踪残留、临时文件与日志、已 gitignore 的工具目录；文档/账本格式小错与状态表落后；调试密钥文件（如 `app/debug.keystore`，一律不入库、自动补 `.gitignore`）；既有 warning（lint 告警、无测试用例等）默认不修不报，除非阻塞本次目标。
  - **备份与旧文件**：确认不影响后续继续开发（无引用、非基线依赖）→ 直接删除、不问不报；确认会影响继续开发 → 保留到大阶段开发完成后再删，**不算待办、不上报、不催**。
  - **必须问的只有四类红线，且一次问全不分多轮**：① secrets 与正式凭据；② 删用户数据或任何不可逆删除；③ 生产环境/数据库/他人项目改动；④ commit/push 与远端写入授权（无明确指令一律不做，**不做也不上报**）。
  - **汇报形态**：单次汇报 ≤10 行＝三行心跳（目标/剩 P0/下一步）＋不超过 3 条要点；**禁把 pending/遗留/out-of-scope/未清除 warning 全量倒给用户**；遗留只列卡住本次目标的，其余进 HANDOFF 一行。**编排者啰嗦按违规打回**，supervisor 按同口径抽查。
- **红线（2026-09-29 增补）**：产品验收未落盘或关键 AC 未测、不得报完工/收工；首次发布未取得用户签收、不得报完工/收工；汇报只报三类小事自决（口径见上「汇报与自决」）。
- **本项目迁移状态**：`docs/model/GOVERNANCE-STATE.json`（`rules_version`／`synced_at`／`project_phase_field`／`task_ledger_rows`／`agents_needs_manual_merge`／`product_acceptance_ac_added`）。
- **存量项目待办（不自动做，需项目 TM 判断）**：本项目实绩 Plan 需补「视觉与交互验收标准（AC 编号）＋关键 AC 集合＋发布类型」，否则新规则下收尾会被判**计划缺项**；完成后把 `product_acceptance_ac_added` 置 `true`。
<!-- ORCA-RULES-BLOCK:END -->


> 项目结构事实与协作约定（neat-freak 2026-08-18 建立）

## 项目性质
- 本项目是「扣子（COZE）编程」的**最终开发提示词 v1.3 交付包**，同时含一份完整可运行的 Next.js 16 + Supabase MVP（在线站点：https://p002-life-species-test.vercel.app ，Vercel 托管；原扣子预览站已停用）。
- 目标产出：带 Supabase 后端数据库的移动端优先 Web 网站（生活物种测试）。
- 当前状态：提示词与素材 DONE；站点已上线（中英双语）。运行环境仍未配 Supabase 凭据——答题与出结果走「演示模式」（本机算分、不落库、无永久链接），只有物种分布图鉴不可用（详见 `docs/handoff/HANDOFF.md` §8、§9）。

## 项目结构事实
- 主需求 / 开发规范：`docs/pm/life_species_coze_prompt_v1_3_FINAL.md`（COZE 提示词 v1.3，唯一权威）
- 交付素材：`species_assets_v1/`（3 part 解压目录）、`species_assets_v1_part1/2/3.zip`（3 个独立 ZIP，共同组成 species_assets_v1）
- 冗余副本（已隔离）：`scratch/species_assets_v1 - 副本/`
- 规范骨架：`docs/{pm,qa,review,handoff,roles}/` + `scratch/`

## Source of Truth（务必遵守提示词约束）
- 唯一正式评分事实源：`life_species_calibrated_scorer_v1.mjs`
- 唯一正式图片映射依据：`life_species_supabase_seed_manifest_v1.json`
- 24 张正式 PNG 命名与 `species_key` 固定绑定，禁止重命名 / 翻译 / 改扩展名
- `manifest.csv` 不上传、不部署、不作为正式映射依据
- 高权限信息（Supabase `service_role`、`DATABASE_URL`）仅服务端环境变量，严禁进前端 bundle

## 协作约定
- 实施时 3 个 ZIP 解压后合并为同一 `public/assets/species/`（24 张 PNG），禁止 part1/2/3 子目录
- 评分模块须通过 `node life_species_calibrated_scorer_test_v1.mjs`：24/24 fixture、deterministic、crossFamilySecondary、status=PASS
- 文档遵循规范模板 v2.3
