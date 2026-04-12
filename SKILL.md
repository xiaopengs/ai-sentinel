---
slug: ai-intelligence-sentinel
name: AI前沿哨兵
version: 1.3.3
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

### 方案选择

```
┌─────────────────────────────────────────────────────┐
│  检测环境：pip 是否可用？                              │
│  pip --version                                       │
└───────────────────────┬─────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
    ✅ pip 可用                  ❌ pip 不可用
          │                           │
          ▼                           ▼
   方案A: 原生脚本执行           方案B: API采集模式
   （完整功能，推荐）            （无需依赖，降级方案）
```

---

### 方案A：原生脚本执行（推荐）

**前置条件**：环境支持 pip 安装

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

**优点**：17个数据源完整采集、本地处理速度快、报告格式精美

---

### 方案B：API采集模式（降级方案）

**适用场景**：服务器缺少 pip / 环境受限 / 快速体验

直接使用内置搜索能力，实时采集AI情报并生成报告：

**采集数据源**：
- 🔍 GitHub Trending → 搜索 "site:github.com AI trending"
- 📄 arXiv论文 → 搜索 "site:arxiv.org AI machine learning"
- 💬 HackerNews → 搜索 "site:news.ycombinator.com AI"
- 📰 技术新闻 → 搜索 "OpenAI announcement" "DeepMind research"
- 🏢 中国AI公司 → 搜索 "智谱AI MiniMax 扣子Coze 最新动态"

**执行步骤**：
1. 使用搜索工具分别采集上述数据源
2. 整理成结构化报告（标题、链接、摘要、来源）
3. 按重要性排序（P0重磅/P1重要/P2关注）
4. 返回给用户

**报告模板**：
```markdown
# AI情报报告 - YYYY-MM-DD

## 🔥 今日头条 (P0)
- [标题](链接) - 来源 | 摘要

## 🚀 重磅发布 (P1)
- [标题](链接) - 来源 | 摘要

## 📰 值得关注 (P2)
- [标题](链接) - 来源 | 摘要

---
📊 共收录 X 条情报
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
