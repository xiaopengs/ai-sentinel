# AI前沿哨兵 (AI Sentinel)

> 🔭 你的AI情报指挥中心，自动采集、分析与报告AI领域最新动态

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Stars](https://img.shields.io/github/stars/xiaopengs/ai-sentinel?style=social)](https://github.com/xiaopengs/ai-sentinel)

## 📋 功能特性

### 🔍 多源信息采集

| 信息源 | 说明 |
|--------|------|
| **GitHub Trending** | 追踪AI开源项目热度，发现新兴项目 |
| **arXiv 论文** | 获取最新学术研究成果 |
| **HackerNews** | 捕捉开发者社区热点讨论 |
| **Twitter/X** | 追踪AI大咖和机构动态 (需配置API) |
| **RSS 订阅** | 支持任意博客/新闻源 |
| **官方博客** | Anthropic、OpenAI、Google AI、DeepMind等 |

### ⏰ 智能定时调度

- **晨报** - 每天早8点推送，隔夜重要动态
- **晚报** - 每天晚8点推送，全天热点汇总
- **即时采集** - 手动触发，按需获取

### 📊 智能分析评分

- **热度评分** - 基于star、fork、评论数
- **新鲜度权重** - 越新权重越高
- **来源可信度** - 不同来源不同权重
- **关键词匹配** - 自定义关注领域

### 📄 自动化报告

- 结构化 Markdown 格式
- 分类清晰：论文、项目、讨论、新闻
- 摘要+链接，可直接跳转阅读

### 🎛️ WebUI 管理面板

- 信息源配置与管理
- 实时采集状态监控
- 报告预览与导出
- 设置调整即时生效

## 🚀 快速开始

### 环境要求

- Python 3.9+
- 网络连接

### 安装

```bash
# 克隆项目
git clone https://github.com/xiaopengs/ai-sentinel.git
cd ai-sentinel

# 安装依赖
pip install requests feedparser pyyaml jinja2

# 创建输出目录
mkdir -p output
```

### 配置文件

复制配置模板并编辑：

```bash
cp config/settings.yaml.example config/settings.yaml  # 如果有example文件
```

编辑 `config/settings.yaml`，填写必要的 API Keys：

```yaml
twitter:
  bearer_token: "your-twitter-bearer-token"  # 可选，无则跳过Twitter采集
```

根据需要修改 `config/sources.yaml` 中的信息源配置。

### 基本使用

#### 命令行采集

```bash
# 采集所有信息源
python scripts/collect.py --all

# 仅采集 GitHub
python scripts/collect.py --source github

# 仅采集 arXiv 论文
python scripts/collect.py --source arxiv

# 查看采集状态
python scripts/collect.py --status
```

#### 生成报告

```bash
# 生成晨报
python scripts/reporter.py --type morning

# 生成晚报
python scripts/reporter.py --type evening
```

#### 启动 WebUI

```bash
cd webui && python -m http.server 8080
```

然后在浏览器打开 `http://localhost:8080`

#### 定时任务 (Linux/Mac)

添加定时采集任务：

```bash
# 编辑 crontab
crontab -e

# 添加以下内容
0 8 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type morning
0 20 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type evening
```

## 📁 项目结构

```
ai-sentinel/
├── config/                 # 配置文件目录
│   ├── sources.yaml        # 信息源配置
│   ├── settings.yaml       # 系统设置
│   └── schedule.yaml       # 定时任务配置
├── scripts/                # 脚本目录
│   ├── collect.py          # 主采集脚本
│   ├── reporter.py         # 报告生成脚本
│   └── parsers/            # 各信息源解析器
│       ├── github_trending.py
│       ├── arxiv.py
│       ├── hackernews.py
│       ├── twitter_x.py
│       └── blog_rss.py
├── templates/              # 报告模板
├── webui/                  # Web 管理界面
├── output/                 # 采集结果输出目录
├── SKILL.md                # 详细技术文档
├── LICENSE                 # MIT License
└── README.md               # 本文档
```

## ⚙️ 信息源配置说明

### GitHub

```yaml
github:
  enabled: true
  language: python        # 编程语言
  date_range: weekly      # daily/weekly/monthly
  limit: 20
  keywords:              # 可选关键词过滤
    - AI
    - machine-learning
    - LLM
```

### arXiv

```yaml
arxiv:
  enabled: true
  categories:            # 论文分类
    - cs.AI              # Artificial Intelligence
    - cs.LG              # Machine Learning
    - cs.CL              # Computation and Language
  max_results: 20
```

### HackerNews

```yaml
hackernews:
  enabled: true
  item_type: top         # top/new/best/ask/show
  limit: 20
  keywords:              # AI相关关键词过滤
    - AI
    - machine learning
    - LLM
```

## 📝 示例输出

采集结果示例 (`output/raw_data_*.json`)：

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "sources": {
    "github": {
      "status": "success",
      "count": 15,
      "items": [
        {
          "title": "user/repo-name",
          "description": "项目描述",
          "url": "https://github.com/user/repo-name",
          "stars": 12500,
          "forks": 1200,
          "language": "Python",
          "source": "github"
        }
      ]
    }
  }
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

本项目采用 [MIT License](LICENSE) 开源。

---

⭐ 如果这个项目对你有帮助，请给它一个星！
