# AI前沿哨兵 (AI Sentinel)

> 你的AI情报指挥中心，自动采集、分析与报告AI领域最新动态

## 功能特性

### 🔍 多源信息采集
- **GitHub Trending** - 追踪AI开源项目热度
- **arXiv论文** - 获取最新学术研究成果
- **HackerNews** - 捕捉开发者社区热点讨论
- **Twitter/X** - 追踪AI大咖和机构动态
- **RSS订阅** - 支持任意博客/新闻源
- **官方博客** - Anthropic、智谱AI、MiniMax、字节跳动等

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
- 结构化Markdown格式
- 分类清晰：论文、项目、讨论、新闻
- 摘要+链接，可直接跳转阅读

### 🎛️ WebUI管理面板
- 信息源配置与管理
- 实时采集状态监控
- 报告预览与导出
- 设置调整即时生效

## 快速开始

### 环境要求
- Python 3.9+
- 网络连接

### 安装依赖
```bash
pip install requests feedparser pyyaml jinja2 schedule
```

### 配置文件
1. 复制配置模板：
```bash
cp config/settings.yaml.example config/settings.yaml
```

2. 编辑 `config/settings.yaml`，填写必要的API Keys：
```yaml
twitter:
  bearer_token: "your-twitter-bearer-token"  # 可选，无则跳过Twitter采集
```

3. 根据需要修改 `config/sources.yaml` 中的信息源

### 基本使用

#### 命令行采集
```bash
# 采集所有信息源
python scripts/collect.py --all

# 仅采集GitHub
python scripts/collect.py --source github

# 生成晨报
python scripts/reporter.py --type morning

# 生成晚报
python scripts/reporter.py --type evening
```

#### 启动WebUI
```bash
# 使用Python内置服务器
cd webui && python -m http.server 8080

# 或使用任意静态服务器
```

然后在浏览器打开 `http://localhost:8080`

#### 定时任务
```bash
# 添加到crontab
0 8 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type morning
0 20 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type evening
```

## 项目结构

```
ai-sentinel/
├── SKILL.md                    # 本文档
├── config/
│   ├── sources.yaml            # 信息源配置
│   ├── settings.yaml           # API Keys配置
│   └── schedule.yaml           # 调度时间配置
├── scripts/
│   ├── collect.py              # 采集主入口
│   ├── analyzer.py             # 信息分析评分
│   ├── reporter.py             # 报告生成
│   └── parsers/                # 各平台解析器
│       ├── __init__.py
│       ├── github_trending.py
│       ├── arxiv.py
│       ├── hackernews.py
│       ├── twitter_x.py
│       └── blog_rss.py
├── webui/                      # Web界面
│   ├── index.html
│   ├── style.css
│   └── app.js
├── templates/                  # 报告模板
│   ├── morning_report.md
│   └── evening_report.md
└── references/
    ├── sources_guide.md        # 信息源添加指南
    └── api_setup.md            # API配置指南
```

## 配置说明

### 信息源配置 (config/sources.yaml)
详见 [references/sources_guide.md](references/sources_guide.md)

### API配置 (config/settings.yaml)
详见 [references/api_setup.md](references/api_setup.md)

### 调度配置 (config/schedule.yaml)
```yaml
schedule:
  morning:
    enabled: true
    time: "08:00"
    include_sources:
      - github
      - arxiv
      - hackernews
      
  evening:
    enabled: true
    time: "20:00"
    include_sources:
      - github
      - arxiv
      - hackernews
      - twitter
      - blogs
```

## WebUI使用指南

### 信息源管理
- 点击卡片右上角开关启用/禁用
- 点击"配置"按钮进入详细设置
- 支持拖拽调整显示顺序

### 报告查看
- 左侧菜单切换"晨报"/"晚报"
- 报告自动更新
- 支持导出为Markdown

### 状态监控
- 顶部状态栏显示采集状态
- 点击查看详细日志
- 错误信息实时推送

## 自定义扩展

### 添加新信息源
1. 在 `scripts/parsers/` 创建新的解析器
2. 参考现有解析器实现 `fetch()` 方法
3. 在 `config/sources.yaml` 添加源配置
4. 在 `scripts/collect.py` 注册解析器

详见 [references/sources_guide.md](references/sources_guide.md)

### 修改报告模板
编辑 `templates/` 目录下的模板文件，使用Jinja2语法。

## 常见问题

### Q: Twitter采集失败怎么办？
A: Twitter/X API需要申请Developer账号和Bearer Token。如果没有配置，采集将自动跳过该源。

### Q: 如何添加自定义关键词过滤？
A: 在 `config/settings.yaml` 中的 `keywords` 部分添加。

### Q: 报告生成位置在哪里？
A: 默认保存在 `output/` 目录，可通过 `config/settings.yaml` 修改。

## License

MIT License
