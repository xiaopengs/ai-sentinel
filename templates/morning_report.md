# 🌅 AI前沿哨兵 - {{ date_str }}晨报

{{ greeting }}！欢迎阅读今日AI领域情报汇总。

> 快速了解昨夜今晨发生了什么，不错过重要动态

---

## 📊 概览

| 类型 | 数量 |
|------|------|
| 学术论文 | {{ summary.papers_count }} 篇 |
| 开源项目 | {{ summary.projects_count }} 个 |
| 社区讨论 | {{ summary.discussions_count }} 条 |
| 新闻动态 | {{ summary.news_count }} 条 |

{% if hot_topics %}
## 🔥 热门话题

{% for topic in hot_topics %}
- **{{ topic }}**
{% endfor %}
{% endif %}

---

{% if trending_projects %}
## ⭐ 热门项目

{% for project in trending_projects %}
### {{ project.title }}
{{ project.description or "" }}

| 指标 | 数值 |
|------|------|
| ⭐ Stars | {{ project.stars \| default(0) \| int \| commalist }} |
| 🍴 Forks | {{ project.forks \| default(0) \| int \| commalist }} |
| 📈 热度 | {{ project.score \| round(1) }} |

🔗 [查看项目]({{ project.url }})

---
{% endfor %}
{% endif %}

---

{% if important_papers %}
## 📚 重要论文

{% for paper in important_papers %}
### {{ paper.title }}
**作者**: {{ paper.authors or paper.author_str or "未知" }}

> {{ paper.abstract or paper.summary or "无摘要"[:200] }}...

🏷️ {{ paper.primary_category or paper.category or "Unknown" }}

🔗 [阅读论文]({{ paper.url }})

{% endfor %}
{% endif %}

---

{% if must_read %}
## 📖 精选内容

以下是今日最值得关注的内容：

{% for item in must_read %}
### {{ loop.index }}. [{{ item.title }}]({{ item.url or item.hn_url or "#" }})

{% if item.description %}
{{ item.description[:150] }}...
{% elif item.abstract %}
{{ item.abstract[:150] }}...
{% elif item.text %}
{{ item.text[:150] }}...
{% endif %}

| 来源 | {{ item.source or item._source_name or "Unknown" }} |
| 热度 | ⭐ {{ item.stars \| default(item.score \| default(0)) }} |
| 时间 | {{ item.published or item.time or "未知" }} |

{% if item.authors %}👥 {{ item.author_str or item.authors[0] if item.authors is iterable and item.authors is not string else item.authors }}{% endif %}

---
{% endfor %}
{% endif %}

---

## 📈 今日趋势

{% if insights.hot_topics %}
**热词**: {% for topic in insights.hot_topics %}`{{ topic }}` {% endfor %}
{% endif %}

**最高热度**: {{ summary.top_score \| round(1) }}

---

## 💡 使用说明

- 点击上述链接可直接跳转到原文
- 报告内容基于定时自动采集
- 如需调整采集源或关键词，请修改配置文件

---

*报告生成时间: {{ date_str }} {{ time_str }}*
*由 AI前沿哨兵 自动生成*
