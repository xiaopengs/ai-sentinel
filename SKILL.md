---
slug: ai-intelligence-sentinel
name: AI前沿哨兵
version: 1.3.6
description: AI情报追踪系统。当用户需要追踪AI领域动态、生成AI晨报/晚报、采集GitHub趋势、arXiv论文、技术新闻时使用。触发词：AI情报、AI哨兵、AI资讯、AI动态、科技新闻、论文追踪、开源项目追踪、晨报、晚报。
trigger: "AI情报|AI哨兵|AI资讯|AI动态|科技新闻|论文追踪|开源项目追踪|晨报|晚报"
tools: [shell, filesystem, http]
author: xiaopengs
license: MIT
---

# AI前沿哨兵

> 你的AI情报指挥中心。一键采集、智能分析、自动生成报告。

---

## ⚠️ 执行指南（重要）

**收到用户请求后，按以下流程执行：**

### 🎯 方案选择（新版）

```
┌─────────────────────────────────────────────────────┐
│  所有用户统一使用：智能采集方案                        │
│  （基于系统内置能力，无需任何外部依赖）                 │
└─────────────────────────────────────────────────────┘
```

---

### 方案A：智能采集方案（推荐，通用）

**前置条件**：无（使用系统内置能力，不需要pip、不需要外部API Key）

**核心能力**：
- `search_web` 工具 → 系统内置搜索，直接可用
- `topic_tracking` 技能 → 调用Coze内部API，无需配置
- `fetch_web` 工具 → 抓取具体页面内容

**执行步骤**：

**Step 1: 信息采集（并行调用）**
```
使用 search_web 工具，一次性搜索以下关键词（最多5个）：
1. "AI 大模型 最新动态 2026"
2. "OpenAI Anthropic 新发布"
3. "GitHub AI trending"
4. "AI 创业 融资 2026"
5. "具身智能 Agent 最新进展"
```

**Step 2: 深度追踪（可选）**
```
使用 topic_tracking 技能追踪具体话题：
.skills/skill_topic_tracking/search_topic.sh search_topic --topic 'AI前沿动态' --query '大模型开源' --query 'Agent能力' --is-first-time false
```

**Step 3: 内容抓取**
```
对搜索结果中的关键链接，使用 fetch_web 获取完整内容
```

**Step 4: 生成报告**
```
整理成结构化报告，保存到 ./AI哨兵/晚报/YYYY-MM-DD.md
必须包含：数据洞察 + 个人启示
```

**优点**：
- ✅ 零依赖：不需要pip、不需要外部API Key
- ✅ 全覆盖：所有用户都能正常使用
- ✅ 实时性：直接搜索最新信息

---

### 方案B：原生脚本执行（仅限支持pip的环境）

**前置条件**：环境支持 pip 安装（仅适合云电脑/本地环境）

```bash
# Step 1: 确认技能已安装
ls .skills/ai-intelligence-sentinel/ || npx clawhub@latest install ai-intelligence-sentinel

# Step 2: 安装依赖
cd .skills/ai-intelligence-sentinel
pip install requests feedparser pyyaml jinja2 -q

# Step 3: 生成报告
python scripts/reporter.py --type full

# Step 4: 返回报告
cat reports/$(date +%Y-%m-%d)/full_report_*.md
```

**注意**：如果pip安装失败或脚本卡住，请立即切换回方案A

**报告模板**：
```markdown
# 🛡️ AI前沿哨兵 · 每日情报报告

**报告日期**：YYYY-MM-DD（周X）
**数据来源**：GitHub · arXiv · HackerNews · 官方博客 · 技术媒体

---

## 🔥 今日头条 · P0

### [标题](原文链接)

| 字段 | 内容 |
|------|------|
| 📅 日期 | YYYY-MM-DD |
| 📰 来源 | 来源名称 |
| 💡 一句话摘要 | CEO能看懂的70字核心价值 |
| 📝 详细内容 | 完整描述（2-3句话） |

> 🎯 **CEO决策参考**：对业务/行业的影响判断

---

## 🚀 重磅发布 · P1

### [标题](原文链接)

| 字段 | 内容 |
|------|------|
| 📅 日期 | YYYY-MM-DD |
| 📰 来源 | 来源名称 |
| 💡 一句话摘要 | 核心价值 |
| 🔑 关键指标 | 参数/性能/定价等关键数据 |

---

## 📰 值得关注 · P2

| 标题 | 日期 | 来源 | 摘要 | 链接 |
|------|------|------|------|------|
| 标题1 | YYYY-MM-DD | 来源 | 一句话摘要 | [原文](链接) |
| 标题2 | YYYY-MM-DD | 来源 | 一句话摘要 | [原文](链接) |

---

## 📊 数据洞察

### 今日情报统计
- 总收录：X 条情报
- P0头条：X 条 | P1重磅：X 条 | P2关注：X 条
- 数据源覆盖：GitHub / arXiv / HackerNews / 官方博客 / 技术媒体

### 趋势分析
- **技术热点**：[本周/本月]最热技术方向TOP3，附变化趋势（↑↓）
- **行业动态**：投融资、产品发布、政策变化的关键信号
- **开源生态**：GitHub星标增速最快项目，与上周对比
- **学术前沿**：arXiv热门论文领域分布

### 跨日对比
| 指标 | 今日 | 昨日 | 变化 |
|------|------|------|------|
| 情报总数 | X | X | ↑X% |
| P0事件 | X | X | - |
| 开源项目 | X | X | ↓X% |

---

## 💡 个人启示

> 🎯 本节基于用户记忆（USER.md）自动生成，提供个性化洞察

### 对你工作的启发
[基于USER.md中的职业身份、核心追求、关注领域，分析今日情报对用户的具体价值]
- 建议1：[结合用户关注的技术方向，给出具体行动建议]
- 建议2：[结合用户的受众群体，给出内容创作或分享建议]
- 建议3：[结合用户当前项目，给出技术选型或方向调整建议]

### 值得深入的方向
[基于用户兴趣，推荐值得深入学习或跟踪的方向]
- 方向1：[具体技术/产品/公司] + 为什么值得深入
- 方向2：[具体技术/产品/公司] + 与用户工作的关联

### 行动建议
[本周可执行的具体行动项]
- [ ] 行动项1
- [ ] 行动项2

---

> 📅 本报告生成时间：YYYY-MM-DD HH:MM
> 🛡️ AI哨兵 | 守护你的AI信息边界
```

**采集规范**：

1. **每条情报必须包含**：
   - ✅ 明确日期（YYYY-MM-DD格式，不要"5天前"这种模糊表述）
   - ✅ 原文链接（必须是可点击的真实URL）
   - ✅ 一句话摘要（70字内，CEO一眼能看懂价值）
   - ✅ 来源名称（如：OpenAI Blog、Bloomberg、arXiv）

2. **摘要写作原则**：
   - 先说"是什么"（新产品/新功能/新研究）
   - 再说"为什么重要"（对行业/用户的影响）
   - 最后说"数据支撑"（具体指标）

3. **链接验证**：
   - 确保链接可访问
   - 优先使用官方来源而非转载
   - 中国AI公司优先用官网链接

4. **个人启示生成规范**：
   - **必读用户记忆**：生成报告前，必须读取 `./USER.md` 获取用户画像
   - **必读项目记忆**：读取 `./MEMORY.md` 了解用户当前项目状态
   - **个性化建议**：基于用户的职业身份、关注领域、当前项目，给出具体行动建议
   - **避免泛泛而谈**：不要写"建议关注AI发展"这种空话，要写"作为数字智能产品创造者，MiniMax M2.7的开源可以作为vibe coding语音交互的模型备选"
   - **行动建议可执行**：给出的建议要具体到"这周可以做什么"

---

### 智能采集流程（方案A详细步骤）

**Step 1: 并行搜索（使用 search_web 工具）**
```
一次性调用，传入以下关键词列表：
[
  "AI 大模型 最新动态 2026年4月",
  "OpenAI Anthropic 新发布",
  "GitHub AI trending 2026",
  "AI Agent 具身智能 最新",
  "智谱 MiniMax 字节 最新动态"
]
```

**Step 2: 深度追踪（使用 topic_tracking 技能）**
```bash
# 追踪具体话题
.skills/skill_topic_tracking/search_topic.sh search_topic \
  --topic 'AI前沿动态' \
  --query '大模型开源' \
  --query 'Agent能力突破' \
  --is-first-time false
```

**Step 3: 内容抓取（使用 fetch_web 工具）**
```
对搜索结果中的关键链接，获取完整内容：
- 官方博客文章
- GitHub项目README
- 技术媒体深度报道
```

**Step 4: 读取用户记忆**
```
读取以下文件，生成个性化洞察：
- ./USER.md → 用户画像
- ./MEMORY.md → 当前项目状态
```

**Step 5: 生成报告**
```
按模板整理，保存到：
- 晨报：./AI哨兵/晨报/YYYY-MM-DD.md
- 晚报：./AI哨兵/晚报/YYYY-MM-DD.md
```

---

### 环境修复建议

如需恢复原生能力，可在目标机器执行：
```bash
# Debian/Ubuntu
apt-get update && apt-get install -y python3-pip

# CentOS/RHEL
yum install -y python3-pip

# macOS (已装Homebrew)
brew install python3
```

---

## 🎯 核心功能

| 功能 | 说明 |
|------|------|
| **🔍 多源采集** | GitHub Trending、arXiv、HackerNews、15+官方博客RSS、中国AI公司官网 |
| **📊 智能评分** | 热度+新鲜度+来源可信度+质量，四维评分体系 |
| **📄 报告生成** | 晨报/晚报/小红书风格，Markdown格式，精美排版 |
| **⏰ 定时调度** | 晨报08:00、晚报20:00自动执行 |
| **🎛️ WebUI** | 可视化配置信息源、查看报告、管理模板 |

---

## ⚡ Quick Start

### 一键生成报告

```bash
# 进入项目目录
cd ai-sentinel

# 🎯 推荐：一键生成完整报告（自动采集+分析+生成）
python scripts/reporter.py --type full

# 或者分步执行：
python scripts/collect.py --all              # Step 1: 采集
python scripts/reporter.py --type morning    # Step 2: 生成晨报
python scripts/reporter.py --type evening    # Step 2: 生成晚报
```

**报告输出位置**: `reports/YYYY-MM-DD/full_report_HHMM.md`

---

## 📋 使用场景

| 用户需求 | 执行命令 |
|----------|----------|
| "生成完整报告" | `python scripts/reporter.py --type full` ⭐推荐 |
| "采集AI情报" | `python scripts/collect.py --all` |
| "生成晨报" | `python scripts/reporter.py --type morning` |
| "生成晚报" | `python scripts/reporter.py --type evening` |
| "只看GitHub趋势" | `python scripts/collect.py --source github` |
| "追踪最新论文" | `python scripts/collect.py --source arxiv` |
| "查看HackerNews热点" | `python scripts/collect.py --source hackernews` |

> 💡 **提示**: `--type full` 会自动执行采集→分析→生成完整流程，无需手动分步

---

## 📝 报告生成流程

### 方式一：一键生成完整报告（推荐）

```bash
python scripts/reporter.py --type full
```

自动执行完整流程：采集 → 分析 → 生成

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Step 1     │     │  Step 2     │     │  Step 3     │
│  多源采集    │ ──▶ │  智能分析    │ ──▶ │  报告生成    │
└─────────────┘     └─────────────┘     └─────────────┘
     │                    │                    │
     ▼                    ▼                    ▼
 GitHub Trending      热度评分             完整报告
 arXiv论文            新鲜度评分           (自动保存)
 HackerNews           来源可信度
 RSS博客              质量评分
 中国AI公司
```

### 方式二：分步执行

#### Step 1: 数据采集

采集多个信息源的原始数据，输出到 `output/raw_data_*.json`：

```bash
python scripts/collect.py --all              # 全部信息源
python scripts/collect.py --source github    # 仅GitHub
python scripts/collect.py --source arxiv     # 仅arXiv
python scripts/collect.py --source hackernews # 仅HackerNews
```

### Step 2: 智能分析

系统自动对采集的数据进行评分分析：

- **热度评分**: Stars/Forks/评论数/转发数
- **新鲜度评分**: 发布时间越近分数越高
- **来源可信度**: 官方博客 > 技术媒体 > 社区讨论
- **质量评分**: 内容完整性、技术深度

### Step 3: 报告生成

根据模板生成结构化报告：

```bash
python scripts/reporter.py --type full      # 完整报告（自动采集）
python scripts/reporter.py --type morning   # 晨报（重点事件）
python scripts/reporter.py --type evening   # 晚报（完整汇总）
```

**报告类型对比**：

| 类型 | 命令 | 说明 | 适用场景 |
|------|------|------|----------|
| **full** | `--type full` | 自动采集+分析+生成 | 立即获取最新情报 ⭐推荐 |
| **morning** | `--type morning` | 仅生成晨报 | 早间定时任务 |
| **evening** | `--type evening` | 仅生成晚报 | 晚间定时任务 |

**报告结构**:
- 📰 今日头条 (P0级事件)
- 🚀 重磅发布 (P1级进展)
- 🛠️ 开源项目 (GitHub趋势)
- 📚 学术论文 (arXiv精选，最多2篇)
- 💬 社区热议 (HackerNews)
- 📊 质量评分卡

---

## 📡 信息源覆盖

| 类别 | 信息源 | 说明 |
|------|--------|------|
| **开源项目** | GitHub Trending | AI领域热门项目 |
| **学术论文** | arXiv | cs.AI, cs.LG, cs.CL |
| **社区讨论** | HackerNews | 开发者热点话题 |
| **官方博客** | OpenAI, Anthropic, Google AI, DeepMind, HuggingFace, xAI, Cursor | 一手技术发布 |
| **技术媒体** | InfoQ(全球/中文), TechCrunch AI, VentureBeat AI, MMChat | 行业动态 |
| **中国AI公司** | 智谱AI, MiniMax, 扣子Coze | 国产大模型进展 |

---

## ⚙️ 配置文件

### 信息源配置 (`config/sources.yaml`)

```yaml
# GitHub配置
github:
  enabled: true
  language: python
  date_range: weekly
  limit: 20

# arXiv配置
arxiv:
  enabled: true
  categories:
    - cs.AI
    - cs.LG
    - cs.CL
  max_results: 20

# RSS源
custom_feeds:
  - name: "OpenAI Blog"
    url: "https://openai.com/blog/rss.xml"
    category: "Official Blog"
```

### 调度配置 (`config/schedule.yaml`)

```yaml
schedule:
  morning:
    enabled: true
    time: "08:00"
  evening:
    enabled: true
    time: "20:00"
```

---

## 📁 项目结构

```
ai-sentinel/
├── SKILL.md              # 本文件
├── README.md             # 英文文档
├── README_CN.md          # 中文文档
├── config/
│   ├── sources.yaml      # 信息源配置
│   ├── settings.yaml     # 系统设置
│   └── schedule.yaml     # 调度配置
├── scripts/
│   ├── collect.py        # 采集脚本
│   ├── reporter.py       # 报告生成脚本
│   └── parsers/          # 各源解析器
├── templates/
│   ├── morning_template.md
│   └── evening_template.md
├── webui/                # Web管理界面
└── reports/              # 生成的报告
    └── YYYY-MM-DD/
        ├── morning_report.md
        └── evening_report.md
```

---

## 🔗 相关链接

- **GitHub**: https://github.com/xiaopengs/ai-sentinel
- **ClawHub**: https://clawhub.ai/skills/ai-intelligence-sentinel
- **虾评Skill**: https://xiaping.coze.site/skill/08037f81-1e91-4115-80ad-2e2c1d0681d2
- **项目展示**: http://thinkspc.fun/static/sentinel/

---

## 📌 使用示例

### 示例1: 生成今日AI晚报

```bash
cd ai-sentinel
python scripts/collect.py --all
python scripts/reporter.py --type evening
```

输出: `reports/2026-04-12/evening_report.md`

### 示例2: 仅追踪GitHub热门项目

```bash
python scripts/collect.py --source github
python scripts/reporter.py --type morning
```

### 示例3: 自定义信息源

编辑 `config/sources.yaml`，添加新的RSS源：

```yaml
custom_feeds:
  - name: "My AI Blog"
    url: "https://example.com/feed"
    category: "Personal Blog"
```

---

## ⚠️ 注意事项

1. **首次运行**: 确保 `pip install requests feedparser pyyaml jinja2`
2. **Twitter/X源**: 需要配置API Token（可选）
3. **报告目录**: 自动创建，无需手动创建
4. **数据去重**: 基于URL自动去重，避免重复内容

---

## 🔄 更新日志

**v1.3.1 (2026-04-12)**
- 📝 重构README，面向多角色优化（产品/开发/高管）
- 居中标题布局，添加角色对照表
- 30秒快速开始，降低上手门槛

**v1.3.0 (2026-04-12)**
- ✨ 新增完整报告功能 (`--type full`)，一键采集+分析+生成
- 优化报告生成流程，支持自动执行完整工作流
- 更新文档，添加报告类型对比表

**v1.2.0 (2026-04-12)**
- 重构SKILL.md，优化文档结构
- 重点突出报告生成流程（采集→分析→生成）
- 添加Quick Start和使用场景对照表

**v1.1.0 (2026-04-12)**
- 新增项目展示页
- 英文README为主文档
- 发布到ClawHub和虾评Skill

**v1.0.0 (2026-04-10)**
- 初始版本发布
- 多源采集 + 智能评分 + 报告生成
