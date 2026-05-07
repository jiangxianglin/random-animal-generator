# Random Animal Generator 开发路线文档

## 开发进度

| 阶段 | 小节 | 状态 | 说明 |
| --- | --- | --- | --- |
| 第一阶段：基础清理 | 1.1 建立进度跟踪机制 | 已完成 | 文档已加入进度表，后续每完成一小节都在这里更新 |
| 第一阶段：基础清理 | 1.2 SEO 基础配置清理 | 已完成 | 已统一站点基础 metadata，移除占位验证信息和虚假评分 schema，规范 wheel 子 layout |
| 第一阶段：基础清理 | 1.3 首页定位重写 | 已完成 | 首页主叙事已从 drawing 单点工具调整为 random animal 总入口 |
| 第一阶段：基础清理 | 1.4 文案乱码与字符清理 | 已完成 | 首页和 wheel 页的历史乱码、破损 emoji、异常符号已清理，文案已统一 |
| 第一阶段：基础清理 | 1.5 sitemap 与索引策略升级 | 已完成 | sitemap 已改为基于共享路由配置生成，后续可继续扩展 |
| 第一阶段：基础清理 | 1.6 共享 SEO 工具抽取 | 已完成 | 已抽取共享 metadata 和 schema 生成函数，首页与 wheel 页已接入复用 |
| 第一阶段：基础清理 | 1.7 生成器交互与文案修复 | 已完成 | 已修复首页生成器、结果卡片、挑战面板和 wheel 关键组件中的坏文案、硬编码统计、随机逻辑，并补齐生成器状态同步与重置能力 |
| 第二阶段：核心工具页扩展 | 2.1 Name Generator | 已完成 | 已新增独立的 `random animal name generator` 页面，包含可用工具、独立 metadata、FAQ、结构化数据，以及首页与 sitemap 入口；后续已完成首版视觉重构，并按搜索意图补强了默认结果、快速预设、可复制输出、多用途输出模式、supporting content、正文配图，以及 title / description / robots / sitemap / Twitter Card 优化，并已增加 IndexNow key 文件与提交接口支持 |
| 第二阶段：核心工具页扩展 | 2.2 Sea Animal Generator | 未开始 | 待开发 |
| 第二阶段：核心工具页扩展 | 2.3 Drawing Generator | 未开始 | 待开发 |
| 第二阶段：核心工具页扩展 | 2.4 Mythical Generator | 未开始 | 待开发 |
| 第二阶段：核心工具页扩展 | 2.5 Hybrid Generator | 未开始 | 待开发 |

## 文档目的

这份文档用于明确 `randomanimalgenerator.online` 这个工具站接下来的产品方向、SEO 结构和阶段性开发计划。

后续开发统一以这份文档为基线，避免出现下面这些问题：

- 页面越做越多，但主题越来越散
- 功能做了不少，但没有搜索承接结构
- 每次开发都重新讨论方向
- 页面和数据可以复用，但没有形成统一模板

这份文档主要解决五件事：

- 明确站点定位
- 明确页面架构
- 明确阶段开发顺序
- 明确页面模板标准
- 明确后续判断是否值得继续投入的依据

## 当前现状

截至 `2026-05-07`，网站大致处于以下状态：

- Search Console 近 3 个月曝光非常低
- 当前可被搜索引擎理解和收录的页面数量过少
- 首页同时混合了 `drawing practice`、`random animal discovery`、`challenge` 等多种意图
- `wheel` 页面又偏向另一个工具方向，和首页主意图不完全一致
- 项目本身并不是没有资产，当前已经有 `121` 个动物数据可复用

这说明问题不是“这个项目完全不能做”，而是：

`当前站点结构不适合继续按小修小补的方式做 SEO。`

所以后续不是推倒重来，而是要把现有代码和数据整理成一个可扩展的工具站结构。

## 站点定位

接下来网站的统一定位建议为：

`一个围绕 random animal intent 的工具站，提供随机动物生成、转盘、名字、神话动物、海洋动物、绘画灵感等相关工具。`

这个定位有两个好处：

1. 不再把网站局限在 `drawing` 一个用途上
2. 又不会扩散到完全无关的话题，仍然围绕 `random animal` 这个核心主题

## 核心目标

把当前这个“只有少数页面的小工具站”，逐步升级成一个具备下面结构的可增长网站：

- 一个主首页，承接核心词 `random animal generator`
- 多个独立工具页，承接高意图长尾词
- 分类页，组织动物数据
- 单个动物详情页，形成可规模化索引页面
- 完整的内链结构，让页面之间相互传递主题信号

## 关键词策略

## 核心主词

- `random animal generator`

## 优先开发的工具型关键词

- `random animal generator wheel`
- `random animal name generator`
- `random mythical animal generator`
- `random sea animal generator`
- `random animal generator for drawing`
- `random animal hybrid generator`

## 适合做程序化页面的支撑主题

- 动物分类页
- 绘画难度页
- 单个动物详情页
- 针对 drawing / education 的应用场景页

## 不建议做的关键词方向

以下词虽然在关键词工具里能看到，但不建议作为本站重点页面方向：

- `animal crossing`
- `anime`
- 竞品/品牌词，如 `tuimiz`、`perchance`
- 纯错拼词，如 `generater`、`generatir`

原因很简单：

- 会让站点主题发散
- 带来的流量和当前站点能力不匹配
- 很难沉淀成对主站有帮助的长期权重

## 页面结构规划

## 一、核心工具页

- `/`
- `/random-animal-generator-wheel`
- `/random-animal-name-generator`
- `/random-mythical-animal-generator`
- `/random-sea-animal-generator`
- `/random-animal-generator-for-drawing`
- `/random-animal-hybrid-generator`

## 二、分类页

- `/animals/mammals`
- `/animals/birds`
- `/animals/reptiles`
- `/animals/marine`
- `/animals/insects`

## 三、绘画难度页

- `/animals/easy-to-draw`
- `/animals/medium-to-draw`
- `/animals/hard-to-draw`

## 四、单个动物详情页

示例：

- `/animals/african-elephant`
- `/animals/red-panda`
- `/animals/bengal-tiger`
- `/animals/octopus`

后续目标是逐步覆盖当前数据集中的全部动物。

## 各类页面的职责

## 首页职责

首页应该承担的是“站点总入口”的职责，而不是把所有内容都堆在首页。

首页后续应该做到：

- 主打 `random animal generator`
- 首屏清楚说明网站的核心功能
- 明确链接到各个主要工具页
- 引导用户进入分类页
- 展示部分代表性动物详情页
- 文案聚焦，不再混合过多不同方向的意图

首页应该是 `hub page`，不是唯一 SEO 页。

## 工具页职责

每个工具页都应该只服务一个明确的搜索意图。

每个工具页必须具备：

- 独立的 title 和 meta description
- 独立的 H1 和页面介绍
- 真正可以使用的工具功能
- 对应工具的使用说明
- 3 到 6 个典型使用场景
- 该工具自己的 FAQ
- 指向相关工具页和分类页的内链

工具页不能只是“换个标题的同一个页面”。

## 分类页职责

每个分类页应该做到：

- 解释这个分类是什么
- 展示该分类下的动物列表
- 支持在该分类内随机生成
- 链接到各动物详情页
- 链接到相关工具页

分类页的作用是：

- 强化站点主题聚类
- 提高可收录页面数量
- 为工具页和动物页提供中间层

## 单个动物详情页职责

每个动物详情页建议包含：

- `H1`：动物常见名
- 学名
- 分类标签
- 难度等级
- 图片
- 简要介绍
- 2 到 3 条 facts
- 2 到 3 条 drawing tips
- 相关推荐动物
- 返回生成器的 CTA
- FAQ 模块

这类页面不能做成薄页，不能只有一张图和一个标题。

## 内链规则

后续新增的每个页面，都必须参与整站内链结构。

最低要求如下：

- 首页链接到所有核心工具页和主要分类页
- 每个工具页至少链接到 3 个相关页面
- 每个分类页链接到该分类下所有动物页
- 每个动物页链接回所属分类页，并至少链接到 3 个相关动物
- 所有页面都能回到首页

内链的作用不只是方便用户点击，更重要的是：

- 帮助 Google 发现新页面
- 强化页面之间的主题相关性
- 形成完整的内容结构

## 大规模扩页前必须先修的基础问题

在正式扩展大量页面之前，需要先处理以下问题：

1. 替换 `app/layout.tsx` 里的占位验证信息
2. 移除不真实或不适合的结构化数据，例如虚假的评分信息
3. 修复页面中乱码、异常 emoji 和字符编码问题
4. 规范 App Router 的 layout 结构
5. 统一 canonical、metadata 和页面标题逻辑
6. 升级 sitemap 生成方式，让后续新页面能自动进入 sitemap
7. 检查 robots 和索引策略，确保只有该收录的页面被收录

这些问题如果不先处理，后面新做的所有页面都会继承同样的问题。

## 数据层机会

当前项目已经有一份可直接利用的数据集，这其实是这个站最重要的基础资产之一。

目前已有字段包括：

- `id`
- `commonName`
- `scientificName`
- `category`
- `facts`
- `imageUrl`
- `imageAlt`
- `drawingDifficulty`
- `drawingTips`
- `bodyParts`

这些字段已经足够支持：

- 工具页
- 分类页
- 动物详情页
- 相关推荐逻辑

后续建议逐步补充的字段：

- `shortDescription`
- `habitat`
- `diet`
- `continent`
- `lifespan`
- `size`
- `relatedAnimalIds`
- `aliases`
- `isPopular`

这些不是第一阶段必须做的，但随着页面增多，会明显提高页面质量和可扩展性。

## 分阶段开发计划

## 第一阶段：基础清理

目标：

- 修复当前技术和 SEO 基础问题
- 统一站点定位
- 为后续扩页建立统一模板

任务：

- 清理 metadata
- 移除有风险或不真实的结构化数据
- 修复乱码和异常文案
- 统一导航和 layout 结构
- 准备后续复用的 SEO 工具函数
- 定义共享页面模板

完成标准：

- metadata 逻辑统一
- 没有虚假评分 schema
- 首页和 wheel 页定位清晰
- sitemap 和 robots 可作为后续扩展基础

## 第二阶段：核心工具页扩展

目标：

- 上线最有价值、最适合当前数据支撑的几个长尾工具页

任务：

- 开发 `random animal name generator`
- 开发 `random mythical animal generator`
- 开发 `random sea animal generator`
- 开发 `random animal generator for drawing`
- 开发 `random animal hybrid generator`

完成标准：

- 每个工具页都有独立内容和 metadata
- 每个页面都可以单独被搜索引擎理解
- 首页能清楚链接到这些工具页

## 第三阶段：分类页和难度页

目标：

- 建立清晰的主题聚类结构

任务：

- 开发分类页
- 开发难度页
- 从工具页链接到分类页
- 从分类页链接到动物详情页

完成标准：

- 所有主要分类都有对应页面
- 网站开始具备成体系的主题结构

## 第四阶段：单个动物详情页

目标：

- 把现有动物数据库转化成稳定的 SEO 页面资产

任务：

- 为全部动物生成路由
- 建立统一的动物详情页模板
- 增加 related animals 逻辑
- 增加分类和难度导航

完成标准：

- 数据集中的每个动物都有独立可索引页面
- 动物页进入 sitemap
- 页面内容不是薄页

## 第五阶段：数据观察与迭代

目标：

- 用真实搜索数据来决定后续投入，而不是只看关键词工具

任务：

- 每 2 周查看一次 Search Console
- 观察哪些页面开始有 impression
- 找出有曝光但点击低的页面
- 根据已有信号继续扩展，而不是盲目新增页面

完成标准：

- 后续开发方向由真实数据驱动
- 页面扩展变得更有针对性

## 推荐开发顺序

建议后续实施顺序如下：

1. 基础清理
2. 首页重写和重新定位
3. wheel 页清理和重构
4. name generator 页面
5. sea animal generator 页面
6. drawing generator 页面
7. mythical generator 页面
8. hybrid generator 页面
9. 分类页
10. 第一批动物详情页

这个顺序的好处是：

- 先解决地基问题
- 再做最容易承接长尾词的页面
- 最后再进入规模化扩页

## 页面模板复用要求

为了后续开发效率，建议所有新页面尽量基于统一的模板块来实现。

建议抽出的共享模块包括：

- 通用页面头部介绍区
- 通用工具容器
- 通用 FAQ 组件
- 通用相关推荐区
- 通用 SEO metadata helper
- 通用 schema 生成函数
- 通用动物列表卡片

目标不是把所有页面做成一个样子，而是：

- 保持开发效率
- 保持结构一致性
- 让新增页面成本下降

## 内容标准

以后所有可索引页面，至少都要满足以下标准：

- 只有一个主要搜索意图
- 有独立 title 和 meta description
- 有明确的 H1
- 有足够的支持性内容
- 有实际工具或数据输出
- 有通往相关页面的内链
- 没有纯粹为了堆关键词而写的废话

要避免的内容问题：

- 大段无意义 SEO 填充文案
- 虚假社会证明
- 所有页面都复制同一套 FAQ
- 仅因为某个词表里有搜索量就强行做页面

## 成功判断标准

这个项目的成功不能只看某一天流量是否立刻上涨，而要看阶段性信号。

## 30 天目标

- 完成基础清理
- 至少上线 3 个新工具页
- sitemap 页面数量明显增加
- 收录页数量开始提升

## 60 天目标

- 全部核心工具页上线
- 分类页上线
- 第一批动物详情页上线
- impression 开始持续增长

## 90 天目标

- 动物详情页体系基本成型
- 曝光不再接近 0
- 至少有一部分长尾页开始拿到点击

## 开发原则

- 只有在页面能服务明确搜索意图时才开发
- 优先做可复用模板，不优先做一次性页面
- 最大化利用现有动物数据
- 始终围绕 `random animal` 主主题，不扩散到不相关方向
- 以后判断方向优先看 Search Console，而不是只看 SEMRUSH 导出数据

## 下一步行动

接下来最合理的第一步是：

`先进入第一阶段，完成基础清理和首页重新定位。`

原因是当前还有一批基础问题，如果不先处理，后续新增页面只会把这些问题复制到整站。

等第一阶段完成后，再逐步开发工具页、分类页和动物详情页，整体推进会更稳。
