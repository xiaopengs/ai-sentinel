/**
 * AI前沿哨兵 - WebUI主脚本
 * 信息源管理、采集控制、报告生成
 */

// 应用状态
const state = {
    currentView: 'dashboard',
    sources: [],
    logs: [],
    stats: {
        github: 0,
        arxiv: 0,
        hn: 0,
        blogs: 0
    },
    keywords: [],
    settings: {
        twitterToken: '',
        morningEnabled: true,
        eveningEnabled: true
    }
};

// 信息源配置
const sourceConfigs = [
    {
        id: 'github',
        name: 'GitHub Trending',
        description: 'AI开源项目热度榜',
        icon: '⌘'
    },
    {
        id: 'arxiv',
        name: 'arXiv论文',
        description: '最新学术研究成果',
        icon: '◉'
    },
    {
        id: 'hackernews',
        name: 'HackerNews',
        description: '开发者社区热点',
        icon: '◈'
    },
    {
        id: 'twitter',
        name: 'Twitter/X',
        description: 'AI大咖动态',
        icon: '✕'
    },
    {
        id: 'blogs',
        name: 'RSS订阅',
        description: '官方博客更新',
        icon: '◎'
    }
];

// 模拟数据（实际使用时替换为真实API调用）
const mockData = {
    github: [
        { title: 'microsoft/DeepSeek-V3', stars: 24500, forks: 2800, description: 'DeepSeek V3: A Powerful MoE LLM', language: 'Python' },
        { title: 'anthropics/anthropic-cookbook', stars: 8200, forks: 890, description: 'A collection of notebooks', language: 'Jupyter' },
        { title: 'openai/openai-o3', stars: 15600, forks: 1200, description: 'Next generation AI model', language: 'Python' }
    ],
    arxiv: [
        { title: 'Attention Is All You Need', authors: 'Vaswani et al.', abstract: 'We propose a new architecture...' },
        { title: 'GPT-4 Technical Report', authors: 'OpenAI Team', abstract: 'We report the development of GPT-4...' }
    ],
    hackernews: [
        { title: 'Show HN: I built an AI coding assistant', score: 892, comments: 234 },
        { title: 'Ask HN: Best practices for LLM deployment?', score: 567, comments: 189 }
    ],
    blogs: [
        { title: 'Anthropic News: Claude 3.5 Release', author: 'Anthropic Team', published: '2小时前' },
        { title: 'OpenAI Blog: New API Features', author: 'OpenAI', published: '5小时前' }
    ]
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSources();
    initSettings();
    initActions();
    updateTime();
    loadMockData();
    
    // 每秒更新时间
    setInterval(updateTime, 1000);
});

// 导航切换
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const viewTitle = document.getElementById('viewTitle');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.dataset.view;
            
            // 更新导航状态
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            // 更新视图
            views.forEach(v => v.classList.remove('active'));
            document.getElementById(`${viewName}View`).classList.add('active');
            
            // 更新标题
            const titles = {
                dashboard: '概览',
                sources: '信息源',
                reports: '报告',
                settings: '配置'
            };
            viewTitle.textContent = titles[viewName] || viewName;
            
            state.currentView = viewName;
        });
    });
}

// 初始化信息源
function initSources() {
    const grid = document.getElementById('sourcesGrid');
    grid.innerHTML = '';
    
    sourceConfigs.forEach(config => {
        const source = state.sources.find(s => s.id === config.id) || { enabled: true, count: 0 };
        const card = createSourceCard(config, source);
        grid.appendChild(card);
    });
    
    // 过滤标签
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterContent(tab.dataset.filter);
        });
    });
}

// 创建信息源卡片
function createSourceCard(config, source) {
    const card = document.createElement('div');
    card.className = 'source-card';
    card.id = `source-${config.id}`;
    
    card.innerHTML = `
        <div class="source-card-header">
            <span class="source-name">${config.icon} ${config.name}</span>
            <label class="source-toggle">
                <input type="checkbox" ${source.enabled ? 'checked' : ''} data-source="${config.id}">
                <span class="toggle-slider"></span>
            </label>
        </div>
        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">${config.description}</p>
        <div class="source-stats">
            <div class="source-stat">
                <div class="source-stat-value" id="count-${config.id}">${source.count}</div>
                <div class="source-stat-label">已采集</div>
            </div>
            <div class="source-stat">
                <div class="source-stat-value">-</div>
                <div class="source-stat-label">上次采集</div>
            </div>
        </div>
        <div class="source-card-actions">
            <button class="source-btn" onclick="collectSource('${config.id}')">立即采集</button>
        </div>
    `;
    
    // 开关事件
    const toggle = card.querySelector('input[type="checkbox"]');
    toggle.addEventListener('change', (e) => {
        source.enabled = e.target.checked;
        showToast(`${config.name}已${source.enabled ? '启用' : '禁用'}`, 'success');
    });
    
    return card;
}

// 初始化设置
function initSettings() {
    const tokenInput = document.getElementById('twitterToken');
    const keywordsInput = document.getElementById('newKeyword');
    const keywordsTags = document.getElementById('keywordsTags');
    
    // Token输入
    tokenInput.addEventListener('change', (e) => {
        state.settings.twitterToken = e.target.value;
    });
    
    // 关键词添加
    keywordsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            addKeyword(e.target.value.trim());
            e.target.value = '';
        }
    });
    
    // 调度开关
    document.getElementById('morningEnabled').addEventListener('change', (e) => {
        state.settings.morningEnabled = e.target.checked;
    });
    
    document.getElementById('eveningEnabled').addEventListener('change', (e) => {
        state.settings.eveningEnabled = e.target.checked;
    });
    
    // 保存按钮
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
    
    // 初始化关键词标签
    state.keywords.forEach(kw => addKeyword(kw, false));
}

// 添加关键词标签
function addKeyword(keyword, shouldRender = true) {
    if (state.keywords.includes(keyword)) return;
    
    state.keywords.push(keyword);
    
    if (shouldRender) {
        const container = document.getElementById('keywordsTags');
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `
            ${keyword}
            <span class="tag-remove" onclick="removeKeyword('${keyword}')">×</span>
        `;
        container.insertBefore(tag, container.lastElementChild);
    }
}

// 移除关键词
function removeKeyword(keyword) {
    state.keywords = state.keywords.filter(k => k !== keyword);
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (tag.textContent.trim().startsWith(keyword)) {
            tag.remove();
        }
    });
}

// 保存设置
function saveSettings() {
    // 保存到本地存储
    localStorage.setItem('sentinel-settings', JSON.stringify(state.settings));
    localStorage.setItem('sentinel-keywords', JSON.stringify(state.keywords));
    
    showToast('配置已保存', 'success');
}

// 初始化操作按钮
function initActions() {
    // 采集按钮
    document.getElementById('collectBtn').addEventListener('click', collectAll);
    
    // 报告按钮
    document.getElementById('reportBtn').addEventListener('click', () => {
        document.querySelector('[data-view="reports"]').click();
    });
    
    document.getElementById('generateReportBtn').addEventListener('click', generateReport);
}

// 采集所有
async function collectAll() {
    showLoading(true);
    addLog('开始采集所有信息源...', 'pending');
    
    const statusIndicator = document.querySelector('.status-indicator');
    statusIndicator.classList.add('working');
    document.querySelector('.status-text').textContent = '采集中';
    
    // 模拟采集过程
    await delay(2000);
    
    // 更新统计数据
    state.stats.github = mockData.github.length;
    state.stats.arxiv = mockData.arxiv.length;
    state.stats.hn = mockData.hackernews.length;
    state.stats.blogs = mockData.blogs.length;
    
    // 更新UI
    updateStats();
    
    // 更新信息源卡片
    sourceConfigs.forEach(config => {
        const count = state.stats[config.id] || 0;
        const countEl = document.getElementById(`count-${config.id}`);
        if (countEl) countEl.textContent = count;
    });
    
    // 更新热门内容
    updateHotContent();
    
    addLog('采集完成', 'success');
    
    showLoading(false);
    statusIndicator.classList.remove('working');
    document.querySelector('.status-text').textContent = '就绪';
    
    showToast('采集完成', 'success');
}

// 采集单个源
async function collectSource(sourceId) {
    showLoading(true);
    addLog(`开始采集 ${sourceId}...`, 'pending');
    
    await delay(1000);
    
    // 更新计数
    const mockCounts = { github: 3, arxiv: 2, hackernews: 2, blogs: 2, twitter: 0 };
    state.stats[sourceId] = mockCounts[sourceId] || 0;
    
    const countEl = document.getElementById(`count-${sourceId}`);
    if (countEl) countEl.textContent = state.stats[sourceId];
    
    addLog(`${sourceId} 采集完成`, 'success');
    showLoading(false);
    showToast(`${sourceId} 采集完成`, 'success');
}

// 生成报告
function generateReport() {
    const type = document.getElementById('reportType').value;
    const preview = document.getElementById('reportPreview');
    
    // 生成模拟报告内容
    const reportHtml = `
        <div class="report-content">
            <h1>${type === 'morning' ? '🌅' : '🌙'} AI前沿哨兵 - ${new Date().toLocaleDateString('zh-CN')} ${type === 'morning' ? '晨报' : '晚报'}</h1>
            
            <h2>📊 概览</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 8px;">学术论文</td>
                    <td>${state.stats.arxiv} 篇</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 8px;">开源项目</td>
                    <td>${state.stats.github} 个</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border);">
                    <td style="padding: 8px;">社区讨论</td>
                    <td>${state.stats.hn} 条</td>
                </tr>
            </table>
            
            <h2>⭐ 热门项目</h2>
            ${mockData.github.map(p => `
                <h3><a href="#">${p.title}</a></h3>
                <p>${p.description}</p>
                <p style="color: var(--text-muted); font-size: 12px;">⭐ ${p.stars.toLocaleString()} | 🍴 ${p.forks} | 📝 ${p.language}</p>
            `).join('')}
            
            <h2>📚 重要论文</h2>
            ${mockData.arxiv.map(p => `
                <h3><a href="#">${p.title}</a></h3>
                <p style="color: var(--text-muted);">${p.authors}</p>
                <p>${p.abstract}</p>
            `).join('')}
            
            <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;">
            <p style="color: var(--text-muted); font-size: 12px;">由 AI前沿哨兵 自动生成</p>
        </div>
    `;
    
    preview.innerHTML = reportHtml;
    showToast('报告已生成', 'success');
}

// 更新统计数据
function updateStats() {
    document.getElementById('statGithub').textContent = state.stats.github;
    document.getElementById('statArxiv').textContent = state.stats.arxiv;
    document.getElementById('statHN').textContent = state.stats.hn;
    document.getElementById('statBlogs').textContent = state.stats.blogs;
}

// 更新热门内容
function updateHotContent(filter = 'all') {
    const container = document.getElementById('hotContent');
    container.innerHTML = '';
    
    let items = [];
    
    if (filter === 'all' || filter === 'projects') {
        mockData.github.forEach(item => {
            items.push({
                ...item,
                type: 'project',
                source: 'GitHub',
                url: '#'
            });
        });
    }
    
    if (filter === 'all' || filter === 'papers') {
        mockData.arxiv.forEach(item => {
            items.push({
                ...item,
                type: 'paper',
                source: 'arXiv',
                url: '#'
            });
        });
    }
    
    if (filter === 'all' || filter === 'discussions') {
        mockData.hackernews.forEach(item => {
            items.push({
                ...item,
                type: 'discussion',
                source: 'HN',
                score: item.score,
                url: '#'
            });
        });
    }
    
    // 排序并显示
    items.sort((a, b) => (b.score || 0) - (a.score || 0));
    
    items.slice(0, 10).forEach(item => {
        const el = document.createElement('div');
        el.className = 'content-item';
        el.innerHTML = `
            <div>
                <div class="content-item-header">
                    <span class="content-source">${item.source}</span>
                    ${item.type === 'project' ? `<span class="content-source">项目</span>` : ''}
                    ${item.type === 'paper' ? `<span class="content-source">论文</span>` : ''}
                    ${item.type === 'discussion' ? `<span class="content-source">讨论</span>` : ''}
                </div>
                <a href="${item.url}" class="content-title">${item.title}</a>
                <div class="content-meta">
                    ${item.stars ? `<span>⭐ ${item.stars.toLocaleString()}</span>` : ''}
                    ${item.score ? `<span>⬆ ${item.score}</span>` : ''}
                    ${item.comments ? `<span>💬 ${item.comments}</span>` : ''}
                </div>
            </div>
            <div class="content-score">
                <div class="score-value">${Math.round(Math.random() * 50 + 50)}</div>
                <div class="score-label">热度</div>
            </div>
        `;
        container.appendChild(el);
    });
}

// 过滤内容
function filterContent(filter) {
    updateHotContent(filter);
}

// 加载模拟数据
function loadMockData() {
    state.stats = {
        github: 0,
        arxiv: 0,
        hn: 0,
        blogs: 0
    };
    
    // 尝试从localStorage加载设置
    const savedSettings = localStorage.getItem('sentinel-settings');
    if (savedSettings) {
        state.settings = JSON.parse(savedSettings);
        document.getElementById('twitterToken').value = state.settings.twitterToken || '';
        document.getElementById('morningEnabled').checked = state.settings.morningEnabled !== false;
        document.getElementById('eveningEnabled').checked = state.settings.eveningEnabled !== false;
    }
    
    const savedKeywords = localStorage.getItem('sentinel-keywords');
    if (savedKeywords) {
        state.keywords = JSON.parse(savedKeywords);
    }
    
    updateStats();
}

// 添加日志
function addLog(message, status = 'pending') {
    const logList = document.getElementById('logList');
    
    // 移除空状态提示
    const empty = logList.querySelector('.log-empty');
    if (empty) empty.remove();
    
    const now = new Date();
    const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const log = document.createElement('div');
    log.className = 'log-item';
    log.innerHTML = `
        <span class="log-time">${time}</span>
        <span class="log-message">${message}</span>
        <span class="log-status ${status}">${status === 'pending' ? '进行中' : status === 'success' ? '完成' : '错误'}</span>
    `;
    
    logList.insertBefore(log, logList.firstChild);
    
    // 保留最近20条
    const items = logList.querySelectorAll('.log-item');
    if (items.length > 20) {
        items[items.length - 1].remove();
    }
    
    // 保存到状态
    state.logs.unshift({ time, message, status });
}

// 显示加载状态
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// 显示Toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 更新时间
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeStr;
}

// 工具函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
