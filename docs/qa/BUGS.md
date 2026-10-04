# Bugs — 生活物种（COZE 提示词交付包）

> 缺陷跟踪首版（neat-freak 2026-08-18）

## 已验证状态
- 提示词 + 素材交付：DONE。仓库含可运行实现（`src/`，Next.js 16 + Supabase），已部署 Vercel；评分器测试 24/24、`Status: PASS`（2026-10-04 本机实测）。
- 唯一已知数据风险点在提示词中明确约束：24 张 PNG 文件名与 `species_key` 绑定，禁止重命名 / 翻译 / 哈希替代，否则破坏数据库映射。

## 待排查 / 潜在项（open）
- [ ] **数据库接口 500（2026-10-04 实测）**：`/api/runs/*`、`/api/results/*`、`/api/stats` 在 Vercel 上返回 500，原因是运行环境未配 Supabase 凭据（Vercel 环境变量 0 个），属配置缺口而非代码缺陷。已补「演示模式」让答题→出结果→生成分享长图在主流程上可用（`POST /api/runs/preview`）；仍待补：物种分布图鉴、可分享的永久结果链接。补齐凭据 + 5 张表 + 24 条种子数据后需回归 `/test` 正常链路、`/r/{share_code}`、`/api/stats`。
- [ ] 结果页四档打分按钮只更新前端状态，未调用 `POST /api/runs/{runId}/feedback`，评分不入库（接口已实现，缺前端接线）。
- [ ] `scratch/species_assets_v1 - 副本/`（26 文件）是否确为冗余副本，待用户确认后可清理（整理阶段未删除）
- [ ] 3 个 ZIP 与副本的内容一致性未逐字节校验

## 待实施方注意（非本包缺陷）
- [ ] 评估 / 合并素材时必须保持 `public/assets/species/` 单目录、24 张原名 PNG（禁止 part1/2/3 子目录）
- [ ] `manifest.csv` 不得作为正式映射依据
- [ ] 服务端环境变量仅放 `service_role` / `DATABASE_URL`，严禁进前端 bundle
- [ ] 评分模块须通过 `life_species_calibrated_scorer_test_v1.mjs` 24/24 且 status=PASS，否则不视为完成

## 处理规则
- 任何实现改动不得修改 24 题 / 18 维 / 24 species_key / 校准算法 / 视觉方向（提示词最高优先级规则）。
