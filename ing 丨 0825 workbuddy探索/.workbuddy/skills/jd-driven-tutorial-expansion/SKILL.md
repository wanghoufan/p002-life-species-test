---
name: jd-driven-tutorial-expansion
description: |
  按「招聘 JD 对照法」为《WorkBuddy 能力分级教程》补充能力分级、使用者视角（人群）与实战场景。
  当用户要求「去招聘网站查 JD」「对照 JD 补充」「典型岗位需要什么电脑技能」「继续扩充人群/场景/案例」
  或指出教程「还不够充实」「人群覆盖不全」时使用。
  核心思路：真实 JD 里「需用电脑完成的工作内容」就是 WorkBuddy 要覆盖的能力方向，把 JD 任务反推成
  人群 → 子功能 → 提示词 → 练习素材，并同步维护能力分级的一致性与实战场景库。
  触发词：JD、招聘、岗位、求职网站、Boss直聘、猎聘、智联、使用者视角、人群、实战场景、能力分级、不够充实。

  不适用于：单纯修改已有某条提示词文案、只做格式排版、或只重建产物（那直接跑 build.py 即可）。
agent_created: true
---

# JD 对照法扩充 WorkBuddy 教程

## 适用项目结构（先确认）
教程根目录 `WorkBuddy教程/`，单一数据源管线：
`src/content_*.py`（数据）→ `gen_*_materials.py`（生成素材）→ `src/build.py`（渲染 tutorial.md + html/index.html）→ `src/convert_docx.py`（导出 Word）。

三处要同步维护：
| 目标 | 数据位置 | 关键约束 |
|---|---|---|
| 能力分级 | 各 `content_*.py` 的 `level` 字段 | **只能是 初级/进阶/高级**（见「坑 1」） |
| 使用者视角 | `content_d.py` 的 `PERSONAS` + `MATRIX` | people 与 stars 行数必须相等 |
| 实战场景 | `content_enrich.py` 的 `CASES` / `TOPICS` | `target` 必须是真实存在的 module_id 或 persona_id |

## 流程

### 1. 调研 JD
用 WebSearch 按岗位族批量搜（每次 3–4 个并行），查询式模板：
`<岗位> 岗位职责 任职要求 Excel 数据报表 台账`
覆盖高频族：新媒体运营、行政、财务会计、数据分析、电商运营、产品经理、HR、销售/BD、项目管理、采购供应链、教师培训师。
来源站点：Boss直聘、猎聘、智联招聘、前程无忧、全职招聘网、国家大学生就业服务平台。

**重点抓两类信息**：
- 岗位职责里「用电脑做的事」→ 转成子功能（写什么文档、做什么表、出什么报告）
- 任职要求里的工具/技能 → 转成能力分级依据

值得记录的一个趋势：2026 年多个 JD 已把「熟练使用 AI 工具 / 大模型工具辅助文案策划、内容创作与数据整理」写进任职要求，可直接作为教程价值论据。

### 2. 找缺口
跑脚本统计现有覆盖，再决定补什么：
```python
import sys, collections; sys.path.insert(0,'src')
import content_d
for p in content_d.PERSONAS: print(p['id'], p['name'])
```
对照 JD 高频岗位，挑「电脑工作强度高且当前未覆盖」的。已覆盖 32 类，缺失过的典型：采购供应链、市场品牌策划、用户社群运营、质量管理、翻译本地化、金融保险顾问。

### 3. 写人群数据
新建 `src/content_d_jd.py`，结构：
```python
JD_PERSONAS = [{"id":"11.27","name":"...","role":"...","summary":"...",
                "related":"关联 轴一 域N ...","jd":"JD 高频要求：...",
                "functions":[{"name","desc","purpose","prompt","preview","level","material"}]}]
```
- 每人 **恰好 10 条**子功能，分级按 3/4/3 或 4/3/3 均衡
- `preview` 只能取：chat/doc/image/media/bars/nodes/flow/dash/schedule/web/tool/stats
- `material.file` 命名 `materials/p_11_<人群序号>_<01-10>.md`（如 11.27 → `p_11_27_01.md`）
- `prompt` 要具体到「输出什么字段/什么格式」，并加约束（缺失标注『待确认』、只使用给定资料）

### 4. 写素材
**务必拆分数据模块再合并**（见「坑 2」）：`gen_jd_scen_<a|b>.py` 存场景 dict，`gen_jd_materials.py` 合并并写文件。
素材格式（对齐既有规范）：
```
# <子功能名> · 练习素材

> 场景：<虚构企业>（<行业，规模>）— <一句话痛点>

## <子功能名> · 原始素材

<真实输入数据，200+ 字，故意埋入差异/异常让练习有意义>

## 输出要求

<与 prompt 一致的要求>

---
*数据来源：虚构企业 <企业名>，仅用于练习。*
```
虚构企业库：蓝星科技（SaaS 80人）、海纳物流（城配 150人）、星辰零售（电商 50人）、绿野农品（农产品 30人）、恒远智造（精密制造 320人）、嘉禾医疗（医疗器械 260人）、明德教育（职教 120人）、灵犀设计（出海设计 45人）、安泰财富（财富管理 60人）。

### 5. 接线
- `content_d.py`：`from content_d_jd import JD_PERSONAS`，并把 `] + EXTRA_PERSONAS` 改成 `] + EXTRA_PERSONAS + JD_PERSONAS`
- `MATRIX`：`people` 追加人群短名；`stars` 追加 10 列星级行（列序固定：文档/数据/开发/多模态/自动化/集成/智能体/研究/系统/可视化）
- `content_enrich.py`：新增 `JD_CASES` 后 `CASES.extend(JD_CASES)`；编号从 **166** 起（1-30 基础、101-165 PDF、166+ JD）
- `build.py` 第 0 章：更新人数、素材数、案例数、能力分级说明
- `README.md`：同样有 5 处硬编码数字要同步（见「坑 4」）

### 6. 重建 + 校验
```bash
python3 src/gen_jd_materials.py            # 生成素材
python3 src/build.py                        # 渲染 md + html
python3 src/convert_docx.py                 # 导出 docx
python3 src/_verify.py                      # 端到端：缺失/占位/重复
python3 src/_audit_cases.py                 # 命名/过薄/案例目标
```
全绿标准：缺失 0、占位 0、重复 0、需规范化命名 0、过薄 0、无效 target 0。

## 坑

1. **分级游离值**：轴一曾出现 `"level": "高阶"`（域 12 共 11 处），但 `build.py` 的 `LEVEL_COLOR` 与 HTML 筛选器只认 初级/进阶/高级 → 这些模块会**没有配色且被筛选漏掉**。新增/修改时只允许这三个值。
2. **单次 Write 过大被截断**：一次写 60 个长场景会失败（file_path 丢失）。拆成 a/b 多个数据模块再合并。
3. **占位扫描误报**：`_verify.py` 的 `PLACEHOLDER_HITS` 含 `xxxx`、`占位符`、`TODO`、`待填充`、`【此处` 等。
   - 脱敏电话别写 `0574-88xxxx`，写 `0574-8880-1234（虚构示例号码）`
   - 素材输出要求里避开「占位符」字面（改用「待替换标记」），但**提示词里保留「占位符」**——它是正确术语且 prompts 不参与扫描，别让 lint 反噬文案质量
4. **硬编码数字**：`build.py` 与 `README.md` 里的人数、素材数、案例数、`_audit_cases.py` 的标题都是写死的。每次扩充后必须同步改，否则文档自相矛盾。
5. **素材路径前缀**：`material["file"]` 有的带 `materials/` 前缀有的不带，处理时统一用 `os.path.basename()` 再拼目录，否则得到 `materials/materials/xxx`。

## 交付前自查
- [ ] 三类目标（能力分级 / 使用者视角 / 实战场景）都有实质增量，不是只改数字
- [ ] `_verify.py` 与 `_audit_cases.py` 全绿
- [ ] 新人群、新案例在 tutorial.md / index.html / tutorial.docx 里都渲染出来了（grep 抽查）
- [ ] 分级值只有 初级/进阶/高级
- [ ] build.py 与 README 的计数已同步
- [ ] **不要 commit/push**（用户纪律：需明确指令）
