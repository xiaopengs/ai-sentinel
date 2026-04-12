# 🔭 AI Sentinel

> Your AI Intelligence Command Center - Automatically collect, analyze, and report the latest AI developments

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Stars](https://img.shields.io/github/stars/xiaopengs/ai-sentinel?style=social)](https://github.com/xiaopengs/ai-sentinel)

🌐 **[Project Showcase](http://thinkspc.fun/static/sentinel/)** | **[中文文档](./README_CN.md)**

📦 **Install:** `npx clawhub@latest install ai-intelligence-sentinel` | **[ClawHub](https://clawhub.ai/skills/ai-intelligence-sentinel)** | **[Xiaping](https://xiaping.coze.site/skill/08037f81-1e91-4115-80ad-2e2c1d0681d2)**

---

## 🚀 Quick Start (1 Minute)

```bash
# 1. Clone the project
git clone https://github.com/xiaopengs/ai-sentinel.git
cd ai-sentinel

# 2. Install dependencies
pip install requests feedparser pyyaml jinja2

# 3. Create output directory
mkdir -p output

# 4. Collect from all sources
python scripts/collect.py --all

# 5. Generate report
python scripts/reporter.py --type morning
```

> 💡 **Tip**: Use WebUI for easier source management

```bash
cd webui && python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

---

## 👤 Who Is This For?

| Audience | Use Case |
|----------|----------|
| **AI Researchers** | Track latest papers and open-source projects |
| **Developers** | Discover trending AI projects and best practices |
| **Investors** | Stay updated on AI industry dynamics and opportunities |
| **Product Managers** | Monitor AI product updates and industry news |
| **Tech Enthusiasts** | Keep up with AI field developments |

---

## ✨ Features

### 🔍 Multi-Source Collection

| Source | Description | Built-in |
|--------|-------------|----------|
| **GitHub Trending** | Track AI open-source project trends | ✅ |
| **arXiv Papers** | Get latest academic research | ✅ |
| **HackerNews** | Capture developer community discussions | ✅ |
| **Twitter/X** | Follow AI thought leaders (API required) | ✅ |
| **RSS Feeds** | Support any blog/news source | ✅ |
| **Official Blogs** | Anthropic, OpenAI, Google AI, DeepMind, etc. | ✅ (Quick templates) |

### ⏰ Smart Scheduling

- **Morning Report** - 8:00 AM daily, overnight highlights
- **Evening Report** - 8:00 PM daily, full-day summary
- **On-Demand Collection** - Manual trigger as needed

### 📊 Intelligent Analysis & Scoring

- **Popularity Score** - Based on stars, forks, comments
- **Freshness Weight** - Newer items rank higher
- **Source Credibility** - Different weights for different sources
- **Keyword Matching** - Custom focus areas

### 📄 Automated Reports

- Structured Markdown format
- Clear categorization: Papers, Projects, Discussions, News
- Summary + links for direct access

### 🎛️ WebUI Management Panel

- Source configuration and management
- Real-time collection status monitoring
- Report preview and export
- Instant settings updates

---

## 📖 Getting Started

### Requirements

- Python 3.9+
- Network connection

### Installation

```bash
# Clone the project
git clone https://github.com/xiaopengs/ai-sentinel.git
cd ai-sentinel

# Install dependencies
pip install requests feedparser pyyaml jinja2

# Create output directory
mkdir -p output
```

### Basic Usage

#### Command Line Collection

```bash
# Collect from all sources
python scripts/collect.py --all

# Collect from GitHub only
python scripts/collect.py --source github

# Collect arXiv papers only
python scripts/collect.py --source arxiv

# Check collection status
python scripts/collect.py --status
```

#### Generate Reports

```bash
# Generate morning report
python scripts/reporter.py --type morning

# Generate evening report
python scripts/reporter.py --type evening
```

#### Start WebUI

```bash
cd webui && python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

#### Scheduled Tasks (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add the following
0 8 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type morning
0 20 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all && python scripts/reporter.py --type evening
```

---

## 🔗 How to Add Information Sources

### Using WebUI (Recommended)

1. Open WebUI and click **"Sources"** in the left menu
2. Click **"Add Source"** button in the top right
3. Two ways to add:

#### Method 1: Quick Add (One-click for common blogs)

In the popup's "Quick Add" section, we provide templates for popular AI blogs:

| Blog | Description |
|------|-------------|
| OpenAI Blog | GPT model updates, research papers |
| Anthropic Blog | Claude, Constitutional AI |
| Google AI Blog | Google's AI research |
| DeepMind Research | Cutting-edge AI research |
| Hugging Face Blog | Open-source LLM and model hub updates |
| Machine Learning Mastery | Practical ML tutorials |

Click "Add" to subscribe instantly!

#### Method 2: Manual Add for Custom Sources

To add other blogs, you need the **RSS feed URL**:

1. Open the target blog website
2. Find the **RSS** or **Feed** icon at the bottom
3. Click and copy the URL from browser address bar
4. Return to WebUI and fill in:
   - **Name**: Blog name (e.g., "AI News")
   - **RSS Feed URL**: The URL you copied
   - **Description**: Brief description (optional)

### Command Line RSS Source Addition

Edit `config/sources.yaml`:

```yaml
custom_rss:
  - name: "AI News"
    url: "https://example.com/feed"
    enabled: true
```

### Common Blog RSS URLs

| Blog | RSS URL |
|------|---------|
| OpenAI Blog | `https://openai.com/blog/rss.xml` |
| Anthropic Blog | `https://www.anthropic.com/news/rss` |
| Google AI Blog | `https://research.google/blog/rss` |
| DeepMind | `https://deepmind.google/blog/rss.xml` |
| Hugging Face | `https://huggingface.co/blog/feed.xml` |
| InfoQ Global | `https://feed.infoq.com` |
| InfoQ Chinese | `https://www.infoq.cn/rss/` |

---

## ⚙️ Source Configuration

### GitHub

```yaml
github:
  enabled: true
  language: python        # Programming language
  date_range: weekly      # daily/weekly/monthly
  limit: 20
  keywords:              # Optional keyword filtering
    - AI
    - machine-learning
    - LLM
```

### arXiv

```yaml
arxiv:
  enabled: true
  categories:            # Paper categories
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
  keywords:              # AI-related keyword filtering
    - AI
    - machine learning
    - LLM
```

### Twitter/X

```yaml
twitter:
  enabled: true
  bearer_token: "your-twitter-bearer-token"  # Required
  keywords:              # Keywords to follow
    - AI
    - GPT
    - LLM
```

**How to Get Bearer Token:**

1. Visit [Twitter Developer Portal](https://developer.twitter.com)
2. Register a developer account (requires review, usually 1-2 days)
3. Create a project and app
4. Generate Bearer Token in app settings
5. Copy the token to `config/settings.yaml` or WebUI config page

**Recommended AI Thought Leaders:**
- `@sama` - Sam Altman (OpenAI CEO)
- `@ylecun` - Yann LeCun (Meta AI Chief Scientist)
- `@karpathy` - Andrej Karpathy (ex-OpenAI)
- `@AndrewYNg` - Andrew Ng (DeepLearning.AI)

---

## 📁 Project Structure

```
ai-sentinel/
├── config/                 # Configuration files
│   ├── sources.yaml        # Source configuration
│   ├── settings.yaml       # System settings
│   └── schedule.yaml       # Scheduled task config
├── scripts/                # Scripts
│   ├── collect.py          # Main collection script
│   ├── reporter.py         # Report generation script
│   └── parsers/            # Source parsers
│       ├── github_trending.py
│       ├── arxiv.py
│       ├── hackernews.py
│       ├── twitter_x.py
│       └── blog_rss.py
├── templates/              # Report templates
├── webui/                  # Web management interface
│   ├── index.html         # Main page
│   ├── app.js             # Frontend logic
│   └── style.css          # Styles
├── output/                 # Collection output
├── SKILL.md                # Technical documentation
├── LICENSE                 # MIT License
└── README.md               # This document
```

---

## ❓ FAQ

### Q: How to add Twitter source?

1. Visit [Twitter Developer Portal](https://developer.twitter.com)
2. Create a developer account (requires review, usually 1-2 days)
3. Create an App and generate Bearer Token
4. Enter the token in WebUI's "Config" page or `config/settings.yaml`

> ⚠️ Requires Twitter developer account, available after approval

### Q: RSS subscription not working?

1. Verify the RSS URL is correct (test by visiting directly in browser)
2. Some sites use Atom format, try `/atom.xml` or `/feed/atom`
3. Check if authentication is required

### Q: Where is the collected data?

- **Raw data**: `output/raw_data_YYYYMMDD_HHMMSS.json`
- **Processed data**: `output/processed_data.json`
- **Reports**: `output/reports/morning_YYYYMMDD.md` or `evening_`

### Q: How to customize report templates?

Edit `templates/report_template.md` using Jinja2 syntax.

### Q: How to adjust collection frequency?

Modify scheduled tasks or use crontab:

```bash
# Collect every 6 hours
0 */6 * * * cd /path/to/ai-sentinel && python scripts/collect.py --all
```

---

## 📄 License

This project is open-sourced under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit Issues or Pull Requests.

---

## 📮 Contact

- GitHub: [xiaopengs/ai-sentinel](https://github.com/xiaopengs/ai-sentinel)
- Issues: [Submit an issue](https://github.com/xiaopengs/ai-sentinel/issues)

---

## 📝 Changelog

### v1.2.0 (2026-04-12)

**📝 Documentation**
- Refactored SKILL.md with improved structure and content
- Added complete report generation workflow (Collect → Analyze → Generate)
- Added Quick Start guide and usage scenario table

### v1.1.0 (2026-04-12)

**🆕 New Features**
- Added [Project Showcase](http://thinkspc.fun/static/sentinel/) - Interactive project introduction page
- English README as primary documentation with Chinese version support
- InfoQ RSS sources (Global + Chinese)

**📢 Published to**
- [ClawHub](https://clawhub.ai/skills/ai-intelligence-sentinel) - Install: `npx clawhub@latest install ai-intelligence-sentinel`
- [Xiaping Skill](https://xiaping.coze.site/skill/08037f81-1e91-4115-80ad-2e2c1d0681d2) - Agent World Alliance

### v1.0.0 (2026-04-10)

- Initial release
- Multi-source collection (GitHub, arXiv, HackerNews, 15+ RSS feeds)
- Morning & evening report generation
- WebUI management panel
- Intelligent scoring system
