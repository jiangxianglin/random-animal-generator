# RandomAnimalGenerator.online SEO / GEO / 落地页优化方案（v3 · 金标准）

适用范围：`https://www.randomanimalgenerator.online`（Next.js App Router）

数据来源：
- [哥飞 SEO Agent 诊断](https://seo.web.cafe/chat/s/0b3579c696ec4f76b8f746cdd964b255)（2026-07，含关键词 KD / 链接预算 / 页面体检）
- Google Search Console（持续迭代）
- AITDK GEO Audit（2026-07-26，以 `/drawing-prompt-generator` 为样板页校准）

这份文档的目标：
- 用「赛道数据 + 页面职责」决定做什么，而不是凭感觉加页
- 给出可重复执行的周流程与阶段清单
- **以后所有新页 / 大改版，一律按「第 13 章 · 落地页金标准」执行**（以 drawing-prompt-generator 为参考实现）
- 已完成项与待办项分开，避免重复劳动

**金标准参考实现（强制对齐）：**
- 页面：`app/drawing-prompt-generator/page.tsx` + `layout.tsx`
- 工具：`components/drawing-generator-tool.tsx`
- 元数据/Schema：`lib/seo.ts` + `lib/site.ts`
- 全站信任页脚：`components/site-footer.tsx`
- robots / llms：`app/robots.ts`、`public/llms.txt`

---

## 0. 一句话结论（来自诊断）

主词 **random animal generator** 值得做（月搜约 **2.4 万**、KD **38.7**、快速上升），DR 0.2 的新站也能进场——但前十里多数是专门页面在正面抢，必须认真做。

差异化切口已写在定位里：**Drawing / Games / Classrooms**（前十大多没做透）。

第一阶段预期（主词排到 5–10、CTR 2–5%）：月访大约 **500–1200**，先卡位吃红利，不指望一夜暴富。

---

## 1. 当前项目状态

### 1.1 已完成（保持）

技术基础：
- 统一子页面路径为「不带尾部 /」
- 非 `www` → `www` 的 301
- sitemap / metadata / 结构化数据 path 与最终 URL 一致

内容可见性（诊断里的 P0 致命项，已修复）：
- 首页 SSR：H1「Random Animal Generator」+ How it works / Drawing / Classroom / FAQ 等正文在 HTML 源码可见
- Wheel / Name / Drawing 页：服务端正文 + 客户端工具岛屿
- 生成器不再让整页 fallback 成 `Loading...`

已有页面：
| 页面 | 主打意图 | 备注 |
|---|---|---|
| `/` | random animal generator | 首页大气层视觉参考 |
| `/random-animal-generator-wheel` | random animal wheel / spinner | 金标准已迁（变更 #007） |
| `/random-animal-name-generator` | random animal name generator | 金标准已迁（变更 #008） |
| `/random-animal-generator-for-drawing` | random animal generator for drawing | 金标准已迁（变更 #010）· animal-first 长尾 |
| `/drawing-prompt-generator` | drawing prompt generator | **金标准样板页（第 13 章）** |
| `/random-animal-picker` | random animal picker | 金标准落地（变更 #005） |
| `/about` `/contact` `/privacy` `/terms` | 信任 / E-E-A-T | 全站页脚入口 |

关联代码：
- `www` / 尾斜杠重定向：`next.config.ts`
- sitemap / nav / 信任常量：`lib/site.ts` → `CORE_SITE_ROUTES`
- 子页 metadata / Schema：`lib/seo.ts` + 各子目录 `layout.tsx`
- robots / llms：`app/robots.ts`、`public/llms.txt`

### 1.2 诊断时指出、现已关闭的问题

| 问题 | 状态 |
|---|---|
| 首页 CSR 空壳（仅 Loading... / 无 H1 / ~16 词） | ✅ 已修（见变更 #003） |
| Wheel / Name 同病 | ✅ 诊断复查为教科书级 SSR，无需全站改造 |
| TDK / canonical / OG / Organization·WebSite | ✅ 基础已有，继续维护 |

### 1.3 仍待做（按性价比）

见下文「阶段路线图」：词矩阵落地页、外链插队收录、体验留存。

---

## 2. 关键词矩阵（首页打主词，内页打子词）

来源：哥飞 SEO Agent 实测。KD 越低越好打；38.7 及以下均可新站入场。

| 关键词 | KD | 月搜（约） | 承接页面 | 优先级 |
|---|---|---|---|---|
| random animal generator | 38.7 | 2.4 万 ↑ | `/`（EMD 域名聚焦） | P0 持续强化 |
| random animal wheel | 27.4 | — | `/random-animal-generator-wheel`（金标准） | **P1 · 冲 CTR** |
| random animal name generator | 27.3 | — | `/random-animal-name-generator`（金标准） | **P1 · 冲 CTR** |
| random animal picker | **9.4（极易）** | — | `/random-animal-picker`（已上线） | **P1 · 冲索引与 CTR** |
| **drawing prompt generator** | **21.2** | **1010** | `/drawing-prompt-generator`（已上线） | **P1 · 冲索引与 CTR** |
| animal drawing challenge | 40.3 | 需自核 | Drawing 相关页内容/FAQ 承接 | P2 |
| spin the wheel drawing challenge | 57.8 | — | 暂缓（需约 DR 35 / 85–180 引用域） | 降优先 |

衍生长尾（可做内容段、FAQ 或后续落地页，不必立刻全开）：
- animal spinning wheel with pictures
- spin the wheel 100 animals
- random land animal generator
- classroom / games 场景词（诊断提示：老师课堂是另一个没人做透的角度，可下一轮单独验词）

页面职责原则：
- **一个主词只由一个主页面承接**；其他页用内链让位，避免互相打架
- Drawing 垂直是差异化：前排「drawing prompt generator」多为泛艺术站，**没人做动物垂直**——用现有动物库做 Random Animal Drawing Prompts

---

## 3. 总体策略（记住这 4 句）

1. **内容必须在 HTML 源码可见**——已修；每次发版用「查看网页源代码」回归，禁止再出现整页 Loading...
2. **首页打主词，内页打子词**——按上表分配，不抢词
3. **先吃低 KD 与垂直差异化**——优先 `drawing prompt generator` + `random animal picker`，再扩 classroom 等
4. **新站收录靠外链插队**——只改站内不够；GSC + 目录/社区外链并行
5. **每周 1–2 类改动**，用 GSC 验证后再扩

---

## 4. KPI 与判断标准

以 28 天为周期（GSC 用 28 天 / 3 个月对比）。

### 4.1 继续投入
- 全站展示较上周期明显增长（例如 > 30%）
- 更多查询落入排名 8–20（可推的低垂果实）
- Wheel / Name / Drawing 相关页：同展示下 CTR 上升
- 新页进入「已索引」，并开始出现目标长尾展示

### 4.2 止损 / 降优先级
- 8–12 周后全站展示仍长期极低（例如 < 1000 / 28 天）且无上升趋势
- 核心词长期 50+ 且无改善
- 新页长期「已发现未索引」且抓取/内链/外链均无法解决
- 高 KD 词（如 spin the wheel drawing challenge）在 DR 明显提升前不再加码

### 4.3 外链与权威（诊断预算）
- 主词前十常规链接预算：约 **35–80** 个引用域（约 DR 27 量级）
- 目录型打法预算：**130–320** 个目录型外链（长期积累，不是一周做完）
- 活证据：randomspinwheel.com（DR 7）排第 4；randomanimal.app（DR 2 首页）排第 8——低 DR 可进前十，但要内容可见 + 体验更好

---

## 5. 数据工作台（每周约 20 分钟）

每周固定一次在 Search Console 筛选，结果记入「变更记录」。

### 5.1 CTR 低但有展示 → 改标题描述
- 展示 > 20，CTR < 1%，排名 5–25 优先
- 只改该查询落地页的 `title` / `description` + 首屏第一段

### 5.2 排名 8–20 → 加内容 + 内链
- 加 1 段正文（答该 query 意图）
- 加 2 个 FAQ
- 加 2 条相关内链（锚文本贴近 query）

### 5.3 同一 query 命中多页 → 消歧
- 指定唯一主承接页
- 其他页改文案/内链让位

### 5.4 发版后技术回归（防 CSR 回潮）
- 查看网页源代码：必须有 H1 + 大段正文，不能只有 Loading...
- 可选：URL 检查 / onpage_audit 复查词数与 H 标签

---

## 6. 优化路线图（按阶段）

### 阶段 A：技术基础（已完成，持续守住）

- 域名唯一：`https://www.randomanimalgenerator.online`
- URL：除首页外统一无尾斜杠
- robots 可抓 + sitemap；GSC 无 sitemap 错误
- 首页与核心子页：SSR/SSG 正文可见、唯一 H1、正文充分（首页目标 **1200+ 词** 量级，H2 覆盖 How it works / Drawing / Classroom / FAQ）

验证：GSC URL 检查 Canonical = www + 规范 path；源码可见 H1/正文。

### 阶段 B：强打已有优势页（进行中）

优先页：Wheel、Name、Home（主词）。

清单：
- Title/Description：答案型、可点击（free / no signup / wheel / copy-ready）
- 首屏一句话说清「解决什么、给谁用」
- 内链：Home ↔ 子页，锚文本用目标词（如 `random animal wheel`、`random animal name generator`）
- FAQ 紧贴该页意图，不泛化
- Wheel 页「Art & Drawing Challenges」卡片 → 链向 Drawing 相关新页（给垂直页输血）

验证：28 天 CTR、页面展示增速。

### 阶段 C：词矩阵落地页（接下来 2–4 周重点）

#### C1 · 优先新建（诊断点名）

**1）`/drawing-prompt-generator`（✅ 已按金标准打磨 · 样板页）**
- 主词：drawing prompt generator（KD 21.2，月搜 ~1010）
- Title（现行）：`Drawing Prompt Generator: Free Animal Ideas`（43 字，`absoluteTitle`）
- Description（现行）：含精确主词，127 字
- 差异化：动物垂直 Drawing Prompts + 计时练习模式 + 每日共享 prompt
- 与 `/random-animal-generator-for-drawing`：精确词 vs animal-first 长尾，双向内链不互抢
- 完整规范见 **第 13 章**；实现见 `app/drawing-prompt-generator/`

**2）`/random-animal-picker`（KD 9.4，极易 · 已上线）**
- Reddit 帖占前排 = 内容真空信号；已按第 13 章金标准落地
- H1 / Title 覆盖 `random animal picker`；工具模式：Pick one / list / category / Today’s pick
- 实现：`app/random-animal-picker/` + `components/animal-picker-tool.tsx`

#### C2 · 随后可选

- `/random-mammal-generator`（或 mammal / bird / reptile / marine / insect 一组）
- `/choose-a-random-animal`
- Classroom 专题页（验词后再开，避免空开）

#### 新页固定模板（摘要 · 细节以第 13 章为准）

- H1：完全匹配主关键词
- Answer-first：每节开头 1–2 句直接定义/结论
- 工具区：复用现有生成器（可默认筛选 / 场景模式）
- How to use：3 步 + 对比表或功能列表 + 具体数字
- FAQ：3–6 个；Sources/Citations；Related tools
- TDK 限长 + OG 1200×630 + Schema（含日期/author/sameAs）+ sitemap
- 设计：`paper-atmosphere` / Fraunces + Source Sans / olive 变量，不用旧 emerald 卡片堆

验证：Pages 是否索引；Queries 是否先涨展示再涨点击；可选 AITDK GEO 复测。

### 阶段 D：收录与外链（与 C 并行，新站必做）

新站收录慢，往往是爬虫队列排不上号——**插队办法是多来几个外链**（见 [GSC 使用入门](https://new.web.cafe/tutorial/detail/9sox64g7o9)）。

落地动作：
1. GSC 属性验证 + sitemap 提交（保持）
2. 社区真实发帖（产品介绍 / 使用场景，避免纯广告）：
   - Reddit：`r/drawing`、`r/learntodraw` 等——「用随机动物转盘做每日画画挑战」类真实场景
   - Indie Hackers、V2EX 等产品介绍帖
3. AI / 工具目录站批量提交（对应主词 130–320 目录型外链的长期预算）
4. 每条外链尽量指向当期主推页（Home 或 drawing-prompt-generator），锚文本自然、多样化

验证：GSC 覆盖率/抓取统计是否改善；引用域是否缓慢增加。

### 阶段 E：体验与留存（P2，有余力再做）

对手 randomspinwheel.com 体验分约 19–22/100，是脆弱占位者——内容可见 + 体验更好即可抢位。

产品向：
- **Daily drawing challenge**（每日挑战）：`/drawing-prompt-generator` 已上线 Today’s prompt + 计时模式；可继续加强留存（跨日 streak / 分享）
- 图片转盘、100 animals、land animals 等功能点，优先服务已验证有搜索的衍生词

### 阶段 F：迭代与精简（第 5 周起常态）

- 每周只做 1–2 类改动
- 改动后观察 14–28 天再下结论
- 有效策略复制到更多页面；无效页降权或合并

---

## 7. 建议的 30 天执行表（可直接照做）

| 周次 | 动作 | 完成标准 |
|---|---|---|
| 第 1 周 | 守住首页 SSR；源码复查 H1 + 正文；GSC/sitemap 无误；Home/Wheel/Name 标题与内链微调 | 源码无 Loading...；Canonical 正确 |
| 第 2 周 | 上线 `/drawing-prompt-generator`；与 for-drawing / Wheel 互链 | 索引提交；Title 以 drawing prompt generator 打头 |
| 第 3 周 | 上线 `/random-animal-picker`；开始目录站 + Reddit/IH 发帖 | 新页进 sitemap；至少若干条可发现外链 |
| 第 4 周 | 只观察 + 小改 CTR（title/description）；补 FAQ/内链；不新开高 KD 词 | GSC 28 天对比表更新一版 |

---

## 8. 页面优化清单（每次改页对照）

> 完整细则见 **第 13 章**。本节是发版前快速勾选表。

### 8.1 On-page / TDK
- [ ] Title ≤ **60** 字符；主关键词靠前；需要时用 `absoluteTitle: true` 避开根模板 `| Random Animal Generator`
- [ ] Description ≤ **160** 字符；含精确主关键词；一句话「工具 + 场景 + 结果」
- [ ] H1 与主关键词一致（每页唯一）
- [ ] 首屏：是什么 + 给谁用 + CTA；Answer-first
- [ ] 正文：子页建议 500–1500 可抽取词；H2/H3 清晰；含列表/表格/具体数字
- [ ] 内链 ≥ 3；FAQ ≥ 3；Sources/Citations ≥ 2（外链权威源优先）
- [ ] 可见 byline：Author + `datePublished` / `dateModified`

### 8.2 Social / 技术
- [ ] OG + Twitter 图：**1200×630**（`public/og-*.png`），metadata 写 width/height/type/alt
- [ ] Canonical 指向生产 HTTPS（`SITE_URL`）；本地审计出现 “canonical 不同” 属预期
- [ ] 源码可见 H1 + 正文（禁止整页 Loading...）
- [ ] 加入 `CORE_SITE_ROUTES` / sitemap；`llms.txt` 如有新核心页则同步

### 8.3 结构化数据
统一走 `lib/seo.ts`：
- 站点级：Organization（含 `sameAs` / email）、WebSite
- 页面级：WebPage（author + dates）+ WebApplication + HowTo + FAQPage + BreadcrumbList

参考实现优先级：
1. **金标准**：`app/drawing-prompt-generator/`
2. Home：`app/page.tsx`（视觉大气层参考）
3. 核心子页已金标准化（Wheel / Name / for-drawing / picker / drawing-prompt）；新建页勿回退旧 emerald 模板

---

## 9. 每周例行流程

1. GSC → Queries：高展示、低 CTR、排名 8–20
2. 选 **1 个页面** 作为本周唯一主优化对象
3. 只做 **1 类** 改动（title/description，或内链，或 FAQ，或新页）
4. 写变更记录：改了什么、为什么、预期指标
5. 14–28 天后回看，再决定是否复制该策略
6. 若本周有发版：做一次「源代码可见性」回归

---

## 10. 变更记录模板

### 变更 #00N（YYYY-MM-DD）
- 范围：页面 / 查询
- 改动：title/description | 内链 | 新增落地页 | FAQ | 结构化数据 | sitemap | 外链
- 目的：提升 CTR / 提升排名 / 扩展示 / 聚合权重 / 收录
- 具体内容：
  - 改前：
  - 改后：
- 预期验证：14 天 / 28 天（展示、点击、CTR、平均排名）
- 结果回顾（到期后填）：

---

## 11. 常见坑

- 同一内容多套 URL（www/非 www、带/不带尾斜杠）稀释信号
- 一次性全站大改标题 → 无法归因
- 新页无内链 + 无 sitemap + 无外链 → 长期不索引
- FAQ 泛化、两页抢同一主词 → 内耗
- 发版把生成器又包回整页 Client Component → CSR 空壳回潮（最高优先级事故）
- 高 KD 词（如 spin the wheel drawing challenge）在权威不足时硬做 → 浪费周期

---

## 12. 变更记录（已执行）

### 变更 #001（2026-07-02）
- 范围：`/`、`/random-animal-generator-wheel`、`/random-animal-name-generator`
- 改动：title/description、首屏文案、内链锚文本
- 目的：提升 CTR、强化页面意图匹配、增强 Home ↔ 子页权重传递
- 具体内容：
  - Wheel 页 metadata 更强调 “Free / Animal wheel spinner / No signup”
  - Name 页 metadata 更强调 “Copy-ready list”
  - Home/Wheel/Name 首屏新增互链（锚文本：random animal wheel spinner / random animal name generator）
- 预期验证（28 天窗口）：
  - Pages：3 页 CTR 是否上升
  - Queries：wheel / spinner / name generator 相关 CTR 与平均排名
  - Pages：Wheel/Name 展示是否增长更快

### 变更 #002（2026-07-02）
- 范围：新增 `/random-animal-generator-for-drawing`
- 改动：新增页面、结构化数据、sitemap
- 目的：承接 “random animal generator for drawing / drawing prompts” 相关长尾
- 具体内容：
  - 绘画提示页：首屏、生成器、HowTo、FAQ、Related links
  - 加入 sitemap（`CORE_SITE_ROUTES`）
- 预期验证：
  - 新页是否「已索引」
  - drawing 相关查询是否出现展示
- 备注（v2）：该页继续承接 animal-first 长尾；精确词 **drawing prompt generator** 由后续 `/drawing-prompt-generator` 主攻，两页分工、互链不互抢。

### 变更 #003（2026-07-19）
- 范围：`/`、`/random-animal-generator-wheel`、`/random-animal-name-generator`、`/random-animal-generator-for-drawing`
- 改动：SSR/SSG 内容可见性、H1、正文扩写、生成器拆为客户端岛屿
- 目的：修复谷歌首轮抓取只看到 CSR 空壳的致命问题（对应诊断 P0）
- 具体内容：
  - 首页 Server Component：H1 与 How it works / Drawing / Classroom / FAQ 等正文在源码可见
  - `useSearchParams` 仅在 `HomeGenerator` 的 Suspense 岛屿内
  - Wheel / Drawing：服务端正文 + 客户端工具
  - Name：服务端 H1/首段，结构化数据在 Server Component
- 预期验证：
  - 源代码出现 H1 与大量正文
  - URL 检查 / onpage_audit 复查
  - 14–28 天后 GSC 展示是否回升

### 变更 #004（2026-07-26）
- 范围：新建 `/drawing-prompt-generator`；更新 for-drawing / Wheel / Home 内链
- 改动：新增落地页、metadata、Schema、sitemap、互链
- 目的：承接 KD 21.2 / 月搜 ~1010 的 drawing prompt generator，动物垂直差异化
- 具体内容：
  - Title：`Drawing Prompt Generator: Random Animal Art Ideas`
  - H1：`Drawing Prompt Generator`；复用 `DrawingGeneratorTool`；HowTo + FAQ + Related
  - for-drawing 继续承接 animal-first 长尾，双向锚文本各用各的主词
  - Wheel「Art & Drawing Challenges」与 Related Tools 链向新页
  - `CORE_SITE_ROUTES` 加入新 path
- 预期验证（14–28 天）：
  - Pages：新页是否「已索引」
  - Queries：drawing prompt generator 及相关长尾展示/点击
- 结果回顾（到期后填）：

### 变更 #005（2026-07-26）
- 范围：新建 `/random-animal-picker`；Home / Wheel / Name / Drawing 互链；sitemap / llms / nav
- 改动：新增落地页（金标准）、工具岛、metadata、Schema、OG、内链
- 目的：吃下 KD 9.4 的 picker 真空；加速收录与主词权威积累
- 具体内容：
  - Title：`Random Animal Picker: Free Instant Pick`（`absoluteTitle`）
  - H1：`Random Animal Picker`；`AnimalPickerTool`（Pick one / list / category / Today’s pick）
  - paper-atmosphere Hero + Stats / Personas / 对比表 / Citations / FAQ / Related
  - OG：`og-random-animal-picker.png`（1200×630）；`CORE_SITE_ROUTES` + `llms.txt` + 导航 Picker
- 外链（站外，并行人工）：目录站 / Reddit / IH 发帖仍待启动，不在本次代码范围
- 预期验证（14–28 天）：新页是否「已索引」；picker 相关展示/点击
- 结果回顾（到期后填）：

### 变更 #006（2026-07-26）· 金标准定稿
- 范围：`/drawing-prompt-generator` 全页打磨；全站信任基建；robots / llms / schema
- 改动：功能体验 + 视觉系统 + GEO + TDK/OG + 信任页
- 目的：把样板页做成可复制标准；提升 AI 引用就绪度（GEO）与 CTR 素材质量
- 具体内容（摘要）：
  1. **用户画像功能**：Practice modes（free / 5-min silhouette / 3-min gesture / 15-min texture / Today’s prompt）、计时器、Copy prompts；导航加 Drawing Prompts
  2. **视觉**：对齐首页 paper/atelier；全宽 Hero + 3 张欧美 atelier 插图（WebP）；去掉旧 emerald 卡片堆
  3. **GEO**：answer-first、统计数字、对比表、Wikipedia/Inktober 引用、byline+日期；About/Contact/Privacy/Terms + SiteFooter；`llms.txt`；Organization `sameAs`；WebPage/WebApp author+dates
  4. **TDK**：Title 43 字 / Description 127 字，均含 `Drawing Prompt Generator`；`absoluteTitle` 防模板撑破
  5. **Social**：`og-drawing-prompt-generator.png` 1200×630 + width/height/type
  6. **robots**：host + sitemap + 显式放行主流 AI 搜索爬虫；disallow `/test-images`、`/api/`
- 预期验证：
  - AITDK GEO 复测（本地 HTTPS FAIL 可忽略；生产 HTTPS 再验）
  - 14–28 天：drawing prompt generator 展示/CTR；新信任页可抓取
- 结果回顾（到期后填）：

### 变更 #007（2026-07-26）· Wheel 金标准迁移
- 范围：`/random-animal-generator-wheel` 全页；`AnimalWheelTool` / spinner 外壳；llms
- 改动：视觉 + GEO + TDK/OG + Schema；去掉 indigo/紫卡片堆
- 目的：冲 `random animal wheel` CTR；与 picker 分工（spin reveal vs instant pick）
- 具体内容：
  - Title：`Random Animal Wheel: Free Spinner`（`absoluteTitle`）；Description 含主词 + free/no signup
  - H1：`Random Animal Wheel`；paper Hero + byline + Stats / Personas / 对比表 / Citations / FAQ
  - Schema：WebPage + WebApp + HowTo + FAQ + Breadcrumb
  - OG 重裁 1200×630；Hero/内容 WebP；工具岛 ink/olive 外壳（spin 逻辑不变）
  - 内链让位：instant → picker；drawing → drawing-prompt
- 预期验证（14–28 天）：Wheel 页 CTR / wheel·spinner 相关查询排名与点击
- 结果回顾（到期后填）：

### 变更 #008（2026-07-26）· Name 金标准迁移
- 范围：`/random-animal-name-generator`；`AnimalNameGeneratorClient` 精简为工具岛；llms
- 改动：视觉 + GEO + TDK/OG + Schema；正文 SSR 化（FAQ/Related 不再藏在 Client）
- 目的：冲 `random animal name generator` CTR；列表意图与 picker/wheel 分工
- 具体内容：
  - Title：`Random Animal Name Generator: Free List`（`absoluteTitle`）
  - H1 精确主词；paper Hero + byline + Stats / Personas / 对比表 / Citations / FAQ
  - 工具岛：quantity / category / format / output mode / presets + copy；paper/ink 外壳
  - OG：`og-random-animal-name-generator.png` 1200×630；Hero/内容 WebP
- 预期验证（14–28 天）：Name 页 CTR；name generator 相关查询展示/点击
- 结果回顾（到期后填）：

### 变更 #009（2026-07-26）· Name 画像功能 + atelier 插图
- 范围：`/random-animal-name-generator`；`AnimalNameGeneratorClient`；`globals.css` name-tool；3 张插图 + OG
- 改动：用户画像功能优先 + 欧美 naturalist 视觉替换旧 UI mockup 图
- 目的：降低空态摩擦；服务 writer / teacher / party / fast-list；冲留存与 CTR
- 具体内容：
  - 工具岛：**Use case**（Fast list / Writer pack / Science drill / Party round）+ 编号行 + Download .txt + Regenerate；默认进 Fast list
  - 插图：Hero 自然学家书桌 / Writing 创作桌 / Classroom 学名练习（WebP）；OG 1200×630 重裁
  - CSS：`.name-tool` chip focus、checkbox、output 内阴影、结果 hover
- 预期验证（14–28 天）：工具互动深度；Name 页 CTR
- 结果回顾（到期后填）：

### 变更 #010（2026-07-26）· for-drawing 金标准迁移
- 范围：`/random-animal-generator-for-drawing`；复用 `DrawingGeneratorTool`；llms
- 改动：去掉 emerald 卡片堆；视觉 + GEO + TDK/OG + Schema
- 目的：承接 animal-first 长尾；与 `/drawing-prompt-generator` 继续分工不互抢
- 具体内容：
  - Title：`Random Animal Generator for Drawing: Free`（`absoluteTitle`）
  - H1：精确主词；paper Hero + byline + Stats / Personas / 对比表 / Citations / FAQ
  - 对比表明确 vs drawing prompt generator 的词职责
  - OG：`og-random-animal-generator-for-drawing.png` 1200×630；Hero/内容 WebP
- 预期验证（14–28 天）：for-drawing 长尾展示；与 drawing-prompt 是否消歧成功
- 结果回顾（到期后填）：

---

## 13. 落地页金标准（以后网页开发 / 优化一律按此）

> **原则：** 新落地页 = SEO 承接词 + GEO 可引用 + 用户画像功能 + paper/atelier 视觉。  
> **禁止：** 回退到旧版「白卡片 + emerald/amber 渐变堆叠」模板；禁止整页 Client Component 导致 CSR 空壳。

### 13.1 用户画像先于功能堆砌

做页前先写清 2–4 个画像与痛点，再决定工具默认态。样板（Drawing Prompt）：

| 画像 | 痛点 | 产品回应 |
|---|---|---|
| 插画师 / 概念艺术家 | 不知道画什么、决策疲劳 | 一键动物 brief + 难度 |
| 美术学生 | 需要限时热身 | 3 / 5 / 15 分钟练习模式 |
| 业余速写者 | 打开就想画，不要复杂 | Free practice + Copy prompts |
| 美术教师 / 社团 | 全班同一题目才公平 | Today’s prompt（全日共享） |

以后新页同样填写此表，再写代码。

### 13.2 页面信息架构（SSR 正文 + 客户端工具岛）

推荐顺序（与样板一致）：

1. **Full-bleed Hero**：主关键词 H1 + 一句 Answer-first 定义 + CTA（跳转 `#generator`）
2. **可见 byline**：Author 链到 `/about` + Published / Updated（`<time datetime>`）
3. **工具岛**（`'use client'`）：生成器 / 转盘 / 列表等
4. **What is…**（定义 + 功能 bullet 列表）
5. **Stats**（具体数字：库容、分类、难度拆分、计时等）
6. **Who it’s for**（画像 2×2）
7. **How to use**（3 步）
8. **对比表**（本页 vs 泛用工具 / vs 站内兄弟页）
9. **场景想法** + 配图（lazy）
10. **Classroom / 场景段** + 配图（如适用）
11. **Why it works** + **blockquote 引用**（外链权威源）
12. **Sources & Citations**（有序列表）
13. **FAQ**（问题式 H3）
14. **Related tools**（列表 + 精确锚文本）
15. **页内信任链**：About · Contact · Privacy · Terms（全站另有 `SiteFooter`）

Schema 建议同时输出：`WebPage` + `WebApplication` + `HowTo` + `FAQPage` + `BreadcrumbList`。

### 13.3 视觉与 CSS 规范

对齐 `app/globals.css` 变量与首页大气层，**不要另起一套紫/奶油/报纸风**：

| 项 | 标准 |
|---|---|
| 背景 | `.paper-atmosphere`（纸感 + 微颗粒），非 flat 单色、非强紫渐变 |
| 字体 | Display：`font-display`（Fraunces）；正文：Source Sans 3 |
| 色板 | `--ink` / `--olive` / `--paper` / `--line`；CTA 用 `.home-cta` / `.btn-ink` |
| Hero | 全宽 bleed 图 + 底部渐变遮罩 + 品牌/H1/一句/CTA；**Hero 内禁止卡片、徽章、stat 条** |
| 内容区 | 优先 `border-t` 分隔，少用重阴影大圆角卡片；卡片仅用于交互控件容器 |
| 动效 | `animate-home-rise` / `fade` 等 2–3 个有意动效；尊重 `prefers-reduced-motion` |
| 插图 | 欧美 atelier / editorial 审美；避免 neon、anime、紫光 AI 感；导出 WebP，Hero/OG 分离 |
| 性能 | 正文图 `loading="lazy"`；OG 专用 1200×630；插图用 sharp 压到合理体积 |

### 13.4 TDK（Title / Description / Keywords 落地）

| 规则 | 要求 |
|---|---|
| Title | ≤ **60** 字符；精确主词靠前；价值词（Free / No signup 等） |
| Description | ≤ **160** 字符；**必须包含精确主关键词**；场景 + 结果 |
| 模板冲突 | 根布局有 `title.template = %s \| Random Animal Generator` → 关键页用 `absoluteTitle: true`（`lib/seo.ts`） |
| H1 | 与主词一致；全页唯一 |
| 词职责 | 一页一词；兄弟页互链让位，禁止两页抢同一主词 |

样板现行值：

```text
Title: Drawing Prompt Generator: Free Animal Ideas
Description: Drawing Prompt Generator for free random animal art ideas, timed warmups, and daily challenges. Filter by difficulty—no signup.
```

实现位置：`app/<page>/layout.tsx` → `buildPageMetadata({ absoluteTitle: true, ... })`。

### 13.5 Open Graph / Twitter Card

| 规则 | 要求 |
|---|---|
| 尺寸 | **1200×630**（从 Hero 或专稿 cover crop） |
| 文件 | `public/og-<page-slug>.png`（可另存 webp，metadata 主推 png 兼容） |
| metadata | `url` + `secureUrl` + `width` + `height` + `type` + `alt` |
| Twitter | `summary_large_image`；`site` / `creator` = `SITE_TWITTER` |
| 禁止 | 直接拿竖图/方图当 OG；禁止缺尺寸导致裁切异常 |

样板：`public/og-drawing-prompt-generator.png`。

### 13.6 GEO（Generative Engine Optimization）清单

AI 搜索（ChatGPT / Perplexity / AI Overviews 等）可引用优先序：

| 优先级 | 检查项 | 落地方式 |
|---|---|---|
| FAIL→必做 | Citations & Quotations | Sources 节 + `<blockquote>` + 外链 Wikipedia 等 |
| FAIL→必做 | About & Contact | `/about` `/contact` + 全站 `SiteFooter` |
| FAIL→生产验 | HTTPS | 生产 `https://www...`；本地 HTTP FAIL 可忽略 |
| WARN | llms.txt | `public/llms.txt`（新核心页要登记） |
| WARN | sameAs | `SITE_SAME_AS` → Organization schema |
| WARN | Author & dates | WebPage/WebApp + byline + `article:published_time` |
| WARN | Answer-first | 每节首句直接答「X is… / To use…」 |
| WARN | Lists & Tables | `<ul>` / `<ol>` / 对比 `<table>` |
| WARN | Statistics | 库容、分类数、难度拆分、计时分钟等 |
| WARN | Privacy & Terms | `/privacy` `/terms` |

Canonical 指向生产域是**有意设计**（避免 AI 引用 localhost）。

### 13.7 robots.txt / 发现性

`app/robots.ts` 标准：

- `User-agent: *` Allow `/`；Disallow `/test-images`、`/api/`
- 显式 Allow 主流 AI 搜索爬虫（GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended 等）
- `Sitemap` + `Host` 指向生产域
- 配套：`/llms.txt`、`/sitemap.xml`

新核心路由必须同步：`lib/site.ts` → `CORE_SITE_ROUTES` + `llms.txt` 条目。

### 13.8 信任与 E-E-A-T 基建（全站共享，勿每页重造）

| 资源 | 路径 |
|---|---|
| About | `/about` |
| Contact | `/contact`（email + Twitter） |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Footer | `components/site-footer.tsx`（挂在 `app/layout.tsx`） |
| 站点常量 | `SITE_EMAIL` / `SITE_SAME_AS` / `SITE_AUTHOR` / `LAST_MAJOR_UPDATE` |

改品牌社交账号或邮箱时，只改 `lib/site.ts`。

### 13.9 新页开发 Checklist（复制到 PR 描述）

```markdown
## 落地页金标准自检
- [ ] 主关键词唯一承接；兄弟页内链让位
- [ ] Title ≤60（必要时 absoluteTitle）；Description ≤160 且含主词
- [ ] H1 = 主词；SSR 源码可见正文（非整页 Loading）
- [ ] paper-atmosphere 视觉；Hero 全宽；无旧 emerald 卡片堆
- [ ] 工具岛 client；场景模式/默认筛选服务画像
- [ ] Answer-first + 列表/表格 + 具体数字 + Citations
- [ ] Schema: WebPage + WebApp + HowTo + FAQ + Breadcrumb（author/dates/sameAs）
- [ ] OG/Twitter 1200×630 专图 + width/height
- [ ] sitemap + llms.txt 已更新
- [ ] About/Contact/Privacy/Terms 链可从页脚到达
```

### 13.10 本次样板页交付清单（变更 #006 文件索引）

| 类型 | 路径 |
|---|---|
| 页面 | `app/drawing-prompt-generator/page.tsx` |
| Metadata | `app/drawing-prompt-generator/layout.tsx` |
| 工具 | `components/drawing-generator-tool.tsx` |
| SEO helpers | `lib/seo.ts` |
| 站点常量 / nav / sitemap | `lib/site.ts` |
| 全站页脚 | `components/site-footer.tsx` |
| 信任页 | `app/about` `app/contact` `app/privacy` `app/terms` |
| robots | `app/robots.ts` |
| llms | `public/llms.txt` |
| Hero / 内容图 | `public/drawing-prompt-*.webp` |
| OG | `public/og-drawing-prompt-generator.png` |

### 13.11 后续页迁移建议

不必一次改完全站。优先级：

1. **新建页** → 直接套金标准（picker 已按此交付）  
2. **主推改版页**：Wheel ✅（#007）· Name ✅（#008/#009）· for-drawing ✅（#010）→ 下一阶段 **外链 / CTR 观察**  
3. **低优先级旧页** → 至少先修 TDK 限长 + OG 1200×630 + 内链；视觉可下一轮  
4. **外链并行**（阶段 D）：目录站 + Reddit/IH，优先指向 Home / drawing-prompt / picker

---

## 14. 文档维护

- 金标准有新增约定时：改 **第 13 章**，并在 **第 12 章** 追加变更号  
- 赛道数据/词矩阵变化时：改第 2 章，不直接改金标准结构  
- Agent / 人工开发前：先读第 13 章 + 打开 `drawing-prompt-generator` 对照实现  
