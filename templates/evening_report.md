# 🌙 AI前沿哨兵 - {{ date_str }}晚报

{{ greeting }}！以下是今日AI领域完整动态回顾。

> 全面了解今日AI圈发生的大小事

---

## 📈 今日总结

| 类型 | 数量 |
|------|------|
| 学术论文 | {{ summary.papers_count }} 篇 |
| 开源项目 | {{ summary.projects_count }} 个 |
| 社区讨论 | {{ summary.discussions_count }} 条 |
| 新闻动态 | {{ summary.news_count }} 条 |

{% if hot_topics %}
## 🔥 今日热词

{% for topic in hot_topics %}
- **{{ topic }}**
{% endfor %}
{% endif %}

---

## 💻 开源项目

{% if projects %}
{% for item in projects %}
### [{{ item.title }}]({{ item.url }})

{{ item.description or item.get('summary', '')[:200] }}

| 指标 | 值 |
|------|---|
| ⭐ Stars | {{ item.stars \| default(0) \| int \| commalist }} |
| 🍴 Forks | {{ item.forks \| default(0) \| int \| commalist }} |
| 📝 语言 | {{ item.language or "Unknown" }} |
| 👤 作者 | [{{ item.author or item.author_name or "Unknown" }}]({{ item.author_url or item.author_github or "#" }}) |

{% endfor %}
{% else %}
暂无新项目
{% endif %}

---

## 📚 最新论文

{% if papers %}
{% for item in papers %}
### [{{ item.title }}]({{ item.url or item.pdf_url or "#" }})

- 👥 **作者**: {{ item.author_str or item.authors \| join(', ') if item.authors is iterable and item.authors is not string else item.authors or "未知" }}
- 🏷️ **分类**: {{ item.primary_category or item.categories[0] if item.categories else "Unknown" }}

> {{ item.abstract[:300] if item.abstract else item.summary or "无摘要" }}

{% if item.pdf_url %}
📄 [PDF全文]({{ item.pdf_url }})
{% endif %}

{% endfor %}
{% else %}
暂无新论文
{% endif %}

---

## 💬 社区热议

{% if discussions %}
{% for item in discussions %}
### [{{ item.title }}]({{ item.hn_url or item.url or "#" }})

| 指标 | 值 |
|------|---|
| ⬆️ 得分 | {{ item.score \| default(0) }} |
| 💬 评论 | {{ item.comments \| default(0) }} |
| 👤 作者 | [{{ item.author }}]({{ item.author_url or "#" }}) |
| 🕐 时间 | {{ item.time or item.published or "未知" }} |

{% endfor %}
{% else %}
暂无社区讨论
{% endif %}

---

## 📰 最新动态

{% if news %}
{% for item in news %}
### [{{ item.title }}]({{ item.url or "#" }})

{{ item.summary[:250] if item.summary else item.description or "无描述" }}

- 📅 **发布时间**: {{ item.published or "未知" }}
- 👤 **作者**: {{ item.author or item.source or "未知" }}
{% if item.categories %}
- 🏷️ **分类**: {{ item.categories \| join(', ') }}
{% endif %}

{% endfor %}
{% else %}
暂无新闻更新
{% endif %}

{% if tweets %}
---

## 🐦 社交动态

{% for item in tweets %}
### [{{ item.author_name or item.author_username }}]({{ item.author_url }})

{{ item.text[:280] }}

| 指标 | 值 |
|------|---|
| ❤️ 点赞 | {{ item.likes \| default(0) }} |
| 🔁 转发 | {{ item.retweets \| default(0) }} |
| 💬 回复 | {{ item.replies \| default(0) }} |

{% endfor %}
{% endif %}

---

## 📊 数据统计

### 来源分布
{% for source, count in summary.items() if source.endswith('_count') %}
- **{{ source.replace('_count', '') }}**: {{ count }}
{% endfor %}

### 热度分布
- 最高热度: {{ summary.top_score \| round(1) }}
- 平均热度: {{ (summary.top_score / 2) \| round(1) }}

---

## 💡 明日预览

建议关注的领域：
- 持续关注 GitHub Trending 新上榜项目
- 定期查看 arXiv 新提交的论文
- HackerNews 上的技术讨论往往预示趋势

---

## 🔧 配置说明

如需调整采集策略，可修改以下配置：
- `config/sources.yaml` - 信息源配置
- `config/settings.yaml` - API Keys和关键词
- `config/schedule.yaml` - 定时任务设置

---

*报告生成时间: {{ date_str }} {{ time_str }}*
*由 AI前沿哨兵 自动生成*
